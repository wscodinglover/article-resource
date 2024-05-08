由于 Vuex 使用了单一状态树，应用的所有状态都包含在一个大对象中。那么，随着应用的不断扩展，store 会变得非常臃肿。

为了解决这个问题，Vuex 允许我们把 store 分 module（模块）。每一个模块包含各自的状态、mutation、action 和 getter。

那么问题来了, 模块化+命名空间之后, 数据都是相对独立的, 如果想在模块 A 调用 模块 B 的`state, actions, mutations, getters`, 该肿么办?

假设有这么两个模块:

#### 模块A:

```javascript
import api from '~api'

const state = {
    vip: {},
}

const actions = {
    async ['get']({commit, state, dispatch}, config = {}) {
        try {
            const { data: { code, data } } = await api.post('vip/getVipBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}

const mutations = {
    ['receive'](state, data) {
        state.vip = data
    }
}

const getters = {
    ['get'](state) {
        return state.vip
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
```

```javascript
import api from '~api'

const state = {
    shop: {},
}

const actions = {
    async ['get']({commit, state, dispatch}, config = {}) {
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}

const mutations = {
    ['receive'](state, data) {
        state.shop = data
    }
}

const getters = {
    ['get'](state) {
        return state.shop
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
```

```javascript
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        console.log(rootState) 
        console.log(rootState.vip) 
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}
```

#### 假设模块 B 的 `actions` 里, 需要调用模块 A 的 `actions` 该怎么办?

```javascript
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config, 'get')
            if (code === 1001) commit('receive', data) 
            dispatch('vip/get', {}, {root: true}) 
        } catch(error) { console.log(error) }
    }
}
```

#### 假设模块 B 的 `actions` 里, 需要调用模块 A 的 `mutations` 该怎么办?

```javascript
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState } = store
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data) 
            commit('vip/receive', data, {root: true}) 
        } catch(error) { console.log(error) }
    }
}
```

#### 假设模块 B 的 `actions` 里, 需要用模块 A 的 `getters` 该怎么办?

```javascript
const actions = {
    async ['shop'](store, config = {}) {
        const { commit, dispatch, state, rootState, rootGetters } = store
        console.log(rootGetters['vip/get']) 
        try {
            const { data: { code, data } } = await api.post('shop/getShopBaseInfo', config)
            if (code === 1001) commit('receive', data)
        } catch(error) { console.log(error) }
    }
}
```