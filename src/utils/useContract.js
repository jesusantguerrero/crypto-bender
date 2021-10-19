import { inject } from "vue";

export const useContract = () => {
    const contract = inject('contract', {});

    return contract
}