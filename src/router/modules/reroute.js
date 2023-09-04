import ReroutePage from '@/components/QR/ReroutePage.vue'
export default [
    {
        path: '/vaccination/:hub_registrant_id',
        name: 'reroute',
        component: ReroutePage,
        meta: { requiresAuth: false },
    }
]