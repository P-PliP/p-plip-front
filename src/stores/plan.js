import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { planApi } from '@/api/plan';
import { useToastStore } from '@/stores/toast';

export const usePlanStore = defineStore('plan', () => {
    const isGeneratingPlan = ref(false);
    const plans = ref([]);
    const totalCount = ref(0); // For pagination if needed
    const isFetchingPlans = ref(false);
    const toastStore = useToastStore();

    const suggestPlan = async (attractionId, query = "") => {
        isGeneratingPlan.value = true;
        try {
            const response = await planApi.suggestPlan(attractionId, query);

            if (response) {
                toastStore.addToast('AI 계획 생성이 완료되었습니다!', 'success');
                // Future: Reload plans or add the new plan to local state
            } else {
                // If response is null/undefined but no error throw, obscure case
                toastStore.addToast('계획 생성 응답이 올바르지 않습니다.', 'warning');
            }
        } catch (error) {
            console.error('Plan suggestion error:', error);
            toastStore.addToast('계획 생성 중 오류가 발생했습니다.', 'error');
        } finally {
            isGeneratingPlan.value = false;
        }
    };

    const fetchPlans = async (params = {}) => {
        isFetchingPlans.value = true;
        try {
            const data = await planApi.getPlans({
                pageNum: 1,
                pageSize: 100, // Fetch enough for now, or implement strict pagination later
                ...params
            });

            // The interceptor returns response.data.data if success is true
            // So 'data' here is the inner data object containing 'list'
            if (data && data.list) {
                plans.value = data.list;
                totalCount.value = data.totalCount;
            } else {
                console.error("Failed to fetch plans: Invalid structure", data);
            }
        } catch (error) {
            console.error("Error fetching plans:", error);
            // Error might be the rejected response object from interceptor
            const msg = error?.message || '여행 계획을 불러오는 중 오류가 발생했습니다.';
            toastStore.addToast(msg, 'error');
        } finally {
            isFetchingPlans.value = false;
        }
    };

    const fetchPlanDetails = async (planId) => {
        try {
            const response = await planApi.getPlanDetails(planId);
            // Handling wrapped response depending on axios interceptor
            // The interceptor returns res.data if success is true. 
            // The API response user showed has structure: { message, data: [...], ... }
            // So 'response' here should be the 'data' array if the interceptor unwraps it completely?
            // Let's check api/index.js again.
            // api/index.js: `if (res.success) { return res.data; }`
            // API Response: `data: [ { ... } ]`
            // So `response` will be `[ { ... } ]`.
            return response || [];
        } catch (error) {
            console.error("Error fetching plan details:", error);
            toastStore.addToast('세부 계획을 불러오는 중 오류가 발생했습니다.', 'error');
            return [];
        }
    };

    const savePlanDetails = async (planId, todoList) => {
        try {
            const response = await planApi.updatePlanDetails(planId, todoList);
            // Response structure: { message, data: { toDoItems: [...] }, ... }
            // Interceptor returns `res.data` -> `{ toDoItems: [...] }`
            if (response && response.toDoItems) {
                toastStore.addToast('계획이 성공적으로 저장되었습니다!', 'success');
                return response.toDoItems;
            }
            return null;
        } catch (error) {
            console.error("Error saving plan details:", error);
            toastStore.addToast('계획 저장 중 오류가 발생했습니다.', 'error');
            throw error;
        }
    };

    const ongoingPlans = computed(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return plans.value.filter(plan => {
            const end = new Date(plan.endDate);
            return end >= today;
        });
    });

    const pastPlans = computed(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return plans.value.filter(plan => {
            const end = new Date(plan.endDate);
            return end < today;
        });
    });

    return {
        isGeneratingPlan,
        plans,
        isFetchingPlans,
        suggestPlan,
        fetchPlans,
        fetchPlanDetails,
        savePlanDetails,
        ongoingPlans,
        pastPlans
    };
});
