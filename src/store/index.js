import { createStore } from 'vuex'
import apiClient from '../resource/baseurl'
import auth from './auth'

export default createStore({
    modules: {
        auth
    },
    state: {
        featuredProducts: [],
        cartItems: [],
        categories: [],
        products: [],
        isLoading: false,
        stores: [],
        paymentMethods: [],
        lang: 'en',
        orderConfirmation: {},
        isProductLoading: false,
        languages: [],
        categoryId: null,
        searchValue: '',
    },
    getters: {
        featuredProducts(state) {
            return state.featuredProducts
        },
        cartItems(state) {
            return [].concat(state.cartItems || []);
        },
        categories(state) {
            return state.categories
        },
        products(state) {
            return state.products
        },
        isLoading(state) {
            return state.isLoading
        },
        stores(state) {
            return state.stores
        },
        paymentMethods(state) {
            return state.paymentMethods
        },
        lang(state) {
            return state.lang
        },
        orderConfirmation(state) {
            return state.orderConfirmation
        },
        isProductLoading(state) {
            return state.isProductLoading
        },
        languages(state) {
            return state.languages
        },
        categoryId(state) {
            return state.categoryId
        },
        searchValue(state) {
            return state.searchValue
        }


    },
    mutations: {
        setFeaturedProducts(state, products) {
            state.featuredProducts = products
        },
        setCartItems(state, product) {
            // 
            var index;
            if (state.cartItems.length) {
                index = state.cartItems.findIndex((cartItem) => {
                    return Number(cartItem.id) === Number(product.id);
                });

                if (index === -1) {
                    state.cartItems.push(product);
                    console.log("other product added");
                } else {
                    state.cartItems[index].qty += product.qty;
                    console.log("the same product added");
                }
            } else {
                if (product) {
                    var newCartItem = {};
                    newCartItem.id = product.id;
                    newCartItem.name = product.name;
                    newCartItem.price = product.price;
                    newCartItem.path = product.path;
                    newCartItem.qty = product.qty;
                    state.cartItems.push(newCartItem);
                    console.log("first  product added");
                } else {
                    state.cartItems = []
                }
            }
            // 
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        },
        setCategories(state, category) {
            state.categories = category
        },
        setProducts(state, products) {
            state.products = products
        },
        setIsLoading(state, value) {
            state.isLoading = value
        },
        setStores(state, stors) {
            state.stores = stors
        },
        setPaymentMethods(state, paymentMethods) {
            state.paymentMethods = paymentMethods
        },
        setLang(state, language) {
            state.lang = language
        },
        setOrderConfirmation(state, confirmationData) {
            state.orderConfirmation = confirmationData
        },
        setIsProductLoading(state, value) {
            state.isProductLoading = value
        },
        setLanguages(state, language) {
            state.languages = language
        },
        setCategoryId(state, id) {
            state.categoryId = id
        },
        setSearchValue(state, value) {
            state.searchValue = value
        }

    },
    actions: {
        async featchFeaturedProduct({ commit }, lang) {
            commit('setIsLoading', true)
            try {
                var response = await apiClient.get(`api/get_featured_products?lang=${lang}`);
                if (response.status === 200) {
                    commit('setFeaturedProducts', response.data.data);
                    console.log('fetured products ===', response.data)
                }
            } catch (err) {
                console.log(err);
            } finally {
                commit('setIsLoading', false)
            }
        },
        async featchCategories({ commit }) {
            try {
                var response = await apiClient.get("api/user_categories");
                if (response.status === 200) {
                    commit('setCategories', response.data.data);
                    commit('setCategoryId', response.data.data[0].id)
                    console.log('categories', response.data.data)
                }
            } catch (err) {
                console.log(err);
            }
        },
        async featchProducts({ commit }, query) {
            commit('setIsLoading', true)
            commit('setIsProductLoading', true)
            try {
                var response = await apiClient.get(`api/get_products/${query.id}?lang=${query.lang}&per_page=${query.per_page}`);
                if (response.status === 200) {
                    commit('setProducts', response.data);
                    console.log('product lists=', response.data)

                }
            } catch (err) {
                console.log(err);
            } finally {
                commit('setIsLoading', false)
                commit('setIsProductLoading', false)
            }
        },

        async featchStores({ commit }, language) {
            commit('setIsLoading', true)
            try {
                var response = await apiClient.get(`api/user_shops?lang=${language}`);
                if (response.status === 200) {
                    console.log('stores=', response.data)
                    commit('setStores', response.data.data);

                }
            } catch (err) {
                console.log(err);
            } finally {
                commit('setIsLoading', false)
            }
        },
        async featchPaymentMethods({ commit }) {
            commit('setIsLoading', true)
            try {
                var response = await apiClient.get(`api/payment_types`);
                if (response.status === 200) {
                    console.log('payment methods =', response.data)
                    commit('setPaymentMethods', response.data);

                }
            } catch (err) {
                console.log(err);
            } finally {
                commit('setIsLoading', false)
            }
        },
        async featchLanguage({ commit }) {
            commit('setIsLoading', true)
            try {
                var response = await apiClient.get(`api/languages`);
                if (response.status === 200) {
                    console.log('languages =', response.data)
                    commit('setLanguages', response.data);

                }
            } catch (err) {
                console.log(err);
            } finally {
                commit('setIsLoading', false)
            }
        }

    },

})