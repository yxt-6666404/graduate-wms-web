import vue from 'vue'
import Vuex from 'vuex'
import router,{resetRouter} from "../router";
import createPeristedState from 'vuex-persistedstate'
vue.use(Vuex)

function addNewRoute(menuList) {
    console.log(menuList);
    let routes = router.options.routes;
    console.log(routes);
    routes.forEach(routeItem=>{
        if(routeItem.path=="/IndexPage"){
            menuList.forEach(menu=>{
                if(menu.menucomponent !==''){
                    let childRoute =  {
                        path:'/'+menu.menuclick,
                        name:menu.menuclick,
                        meta:{
                            title:menu.menuname
                        },
                        component:()=>import('@/components/'+menu.menucomponent)
                    }
    
                    routeItem.children.push(childRoute)
                }
                
            })
        }
    })

    resetRouter()
    router.addRoutes(routes)
    console.log(router.options.routes)
}

export default new Vuex.Store({
    state: {
        menu: []
    },
    create(){
        const menu = localStorage.getItem('menu');
        if(menu){
            this.$store.commit('setMenu',JSON.parse(menu))
        }
    },
    mutations: {
        setMenu(state,menuList) {
            state.menu = menuList

            addNewRoute(menuList);
            localStorage.setItem('menu',JSON.stringify(menuList))
        }
    },
    getters: {
        getMenu(state) {
            return state.menu
        }
    },
    plugins: [createPeristedState()]
})