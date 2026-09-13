import axios, { AxiosInstance } from "axios";

import {
    BackendAPI,
    PaginationOptions
} from "./api";

import {
Bank,
Branch,
ATM,
Customer,
KycProfile,
IdentityDocument,
RiskAssessment,
ScreeningResult,
BankingProduct,
Account,
AccountStatement,
Transaction,
ExternalAccount,
FundsTransfer,
StandingInstruction,
PaymentCard,
LoanAccount,
RepaymentSchedule,
LoanPayment,
Collateral,
FeeCharge,
ExchangeRate,
FXTrade,
Dispute,
Consent,
ThirdPartyProvider,
} from "./types";

export class HttpBackendAPI implements BackendAPI {

    private readonly http: AxiosInstance;

    constructor(
        baseURL: string = process.env.BACKEND_URL || "http://localhost:8080"
    ) {
        this.http = axios.create({
            baseURL,
            timeout: Number(process.env.BACKEND_TIMEOUT) || 30000,
            headers: {
                "Content-Type": "application/json"
            }
        });

        this.http.interceptors.request.use(config => {
            const token = process.env.BACKEND_TOKEN;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });
    }

    bank = {
        find: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Bank/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<Bank[]> => {
            const response = await this.http.get(`/Bank/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: Bank): Promise<Bank> => {
            const response = await this.http.post(`/Bank/create`, input);
            return response.data;
        },

        update: async (args: Bank ): Promise<Bank> => {
            const response = await this.http.put(`/Bank/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Bank/delete/${id}`);
            return true;
        },

        getBranches: async (parentId: string,options?: PaginationOptions): Promise<Branch[]> => {
            const response = await this.http.get(`/Bank/getBranches/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToBranches: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToBranches/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromBranches: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromBranches/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getProducts: async (parentId: string,options?: PaginationOptions): Promise<BankingProduct[]> => {
            const response = await this.http.get(`/Bank/getProducts/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToProducts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToProducts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromProducts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromProducts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getCustomers: async (parentId: string,options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/Bank/getCustomers/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToCustomers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToCustomers/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromCustomers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromCustomers/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getAccounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Bank/getAccounts/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getPaymentCards: async (parentId: string,options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/Bank/getPaymentCards/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToPaymentCards/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromPaymentCards/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getLoanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Bank/getLoanAccounts/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToLoanAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromLoanAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getExchangeRates: async (parentId: string,options?: PaginationOptions): Promise<ExchangeRate[]> => {
            const response = await this.http.get(`/Bank/getExchangeRates/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToExchangeRates: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToExchangeRates/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromExchangeRates: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromExchangeRates/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getConsents: async (parentId: string,options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/Bank/getConsents/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToConsents/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromConsents/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getThirdPartyProviders: async (parentId: string,options?: PaginationOptions): Promise<ThirdPartyProvider[]> => {
            const response = await this.http.get(`/Bank/getThirdPartyProviders/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToThirdPartyProviders: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToThirdPartyProviders/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromThirdPartyProviders: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromThirdPartyProviders/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    branch = {
        find: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/Branch/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<Branch[]> => {
            const response = await this.http.get(`/Branch/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: Branch): Promise<Branch> => {
            const response = await this.http.post(`/Branch/create`, input);
            return response.data;
        },

        update: async (args: Branch ): Promise<Branch> => {
            const response = await this.http.put(`/Branch/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Branch/delete/${id}`);
            return true;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/Branch/getBank`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Branch/assignBank`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Branch/unassignBank`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getAccounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Branch/getAccounts/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/addToAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/removeFromAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getLoanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Branch/getLoanAccounts/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/addToLoanAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/removeFromLoanAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getAtms: async (parentId: string,options?: PaginationOptions): Promise<ATM[]> => {
            const response = await this.http.get(`/Branch/getAtms/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToAtms: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/addToAtms/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromAtms: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/removeFromAtms/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    aTM = {
        find: async (id: string): Promise<ATM | null> => {
            const response = await this.http.get(`/ATM/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<ATM[]> => {
            const response = await this.http.get(`/ATM/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: ATM): Promise<ATM> => {
            const response = await this.http.post(`/ATM/create`, input);
            return response.data;
        },

        update: async (args: ATM ): Promise<ATM> => {
            const response = await this.http.put(`/ATM/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ATM/delete/${id}`);
            return true;
        },

        getBranch: async (parentId: string): Promise<Branch | null> => {
            const response = await this.http.put(`/ATM/getBranch`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ATM/assignBranch`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ATM/unassignBranch`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    customer = {
        find: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/Customer/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/Customer/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: Customer): Promise<Customer> => {
            const response = await this.http.post(`/Customer/create`, input);
            return response.data;
        },

        update: async (args: Customer ): Promise<Customer> => {
            const response = await this.http.put(`/Customer/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Customer/delete/${id}`);
            return true;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/Customer/getBank`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Customer/assignBank`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Customer/unassignBank`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getAccounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Customer/getAccounts/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getLoanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Customer/getLoanAccounts/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToLoanAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromLoanAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getPaymentCards: async (parentId: string,options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/Customer/getPaymentCards/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToPaymentCards/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromPaymentCards/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getExternalAccounts: async (parentId: string,options?: PaginationOptions): Promise<ExternalAccount[]> => {
            const response = await this.http.get(`/Customer/getExternalAccounts/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToExternalAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToExternalAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromExternalAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromExternalAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getFundsTransfers: async (parentId: string,options?: PaginationOptions): Promise<FundsTransfer[]> => {
            const response = await this.http.get(`/Customer/getFundsTransfers/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToFundsTransfers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToFundsTransfers/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromFundsTransfers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromFundsTransfers/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getDisputes: async (parentId: string,options?: PaginationOptions): Promise<Dispute[]> => {
            const response = await this.http.get(`/Customer/getDisputes/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToDisputes: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToDisputes/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromDisputes: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromDisputes/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getKycProfiles: async (parentId: string,options?: PaginationOptions): Promise<KycProfile[]> => {
            const response = await this.http.get(`/Customer/getKycProfiles/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToKycProfiles: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToKycProfiles/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromKycProfiles: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromKycProfiles/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getConsents: async (parentId: string,options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/Customer/getConsents/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToConsents/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromConsents/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    kycProfile = {
        find: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/KycProfile/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<KycProfile[]> => {
            const response = await this.http.get(`/KycProfile/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: KycProfile): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/create`, input);
            return response.data;
        },

        update: async (args: KycProfile ): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/KycProfile/delete/${id}`);
            return true;
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/KycProfile/getCustomer`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/KycProfile/assignCustomer`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/KycProfile/unassignCustomer`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getIdentityDocuments: async (parentId: string,options?: PaginationOptions): Promise<IdentityDocument[]> => {
            const response = await this.http.get(`/KycProfile/getIdentityDocuments/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToIdentityDocuments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/addToIdentityDocuments/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromIdentityDocuments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/removeFromIdentityDocuments/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getRiskAssessments: async (parentId: string,options?: PaginationOptions): Promise<RiskAssessment[]> => {
            const response = await this.http.get(`/KycProfile/getRiskAssessments/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToRiskAssessments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/addToRiskAssessments/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromRiskAssessments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/removeFromRiskAssessments/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getScreenings: async (parentId: string,options?: PaginationOptions): Promise<ScreeningResult[]> => {
            const response = await this.http.get(`/KycProfile/getScreenings/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToScreenings: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/addToScreenings/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromScreenings: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/removeFromScreenings/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    identityDocument = {
        find: async (id: string): Promise<IdentityDocument | null> => {
            const response = await this.http.get(`/IdentityDocument/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<IdentityDocument[]> => {
            const response = await this.http.get(`/IdentityDocument/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: IdentityDocument): Promise<IdentityDocument> => {
            const response = await this.http.post(`/IdentityDocument/create`, input);
            return response.data;
        },

        update: async (args: IdentityDocument ): Promise<IdentityDocument> => {
            const response = await this.http.put(`/IdentityDocument/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/IdentityDocument/delete/${id}`);
            return true;
        },

        getKycProfile: async (parentId: string): Promise<KycProfile | null> => {
            const response = await this.http.put(`/IdentityDocument/getKycProfile`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/IdentityDocument/assignKycProfile`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/IdentityDocument/unassignKycProfile`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    riskAssessment = {
        find: async (id: string): Promise<RiskAssessment | null> => {
            const response = await this.http.get(`/RiskAssessment/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<RiskAssessment[]> => {
            const response = await this.http.get(`/RiskAssessment/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: RiskAssessment): Promise<RiskAssessment> => {
            const response = await this.http.post(`/RiskAssessment/create`, input);
            return response.data;
        },

        update: async (args: RiskAssessment ): Promise<RiskAssessment> => {
            const response = await this.http.put(`/RiskAssessment/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/RiskAssessment/delete/${id}`);
            return true;
        },

        getKycProfile: async (parentId: string): Promise<KycProfile | null> => {
            const response = await this.http.put(`/RiskAssessment/getKycProfile`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RiskAssessment/assignKycProfile`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RiskAssessment/unassignKycProfile`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    screeningResult = {
        find: async (id: string): Promise<ScreeningResult | null> => {
            const response = await this.http.get(`/ScreeningResult/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<ScreeningResult[]> => {
            const response = await this.http.get(`/ScreeningResult/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: ScreeningResult): Promise<ScreeningResult> => {
            const response = await this.http.post(`/ScreeningResult/create`, input);
            return response.data;
        },

        update: async (args: ScreeningResult ): Promise<ScreeningResult> => {
            const response = await this.http.put(`/ScreeningResult/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ScreeningResult/delete/${id}`);
            return true;
        },

        getKycProfile: async (parentId: string): Promise<KycProfile | null> => {
            const response = await this.http.put(`/ScreeningResult/getKycProfile`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ScreeningResult/assignKycProfile`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ScreeningResult/unassignKycProfile`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    bankingProduct = {
        find: async (id: string): Promise<BankingProduct | null> => {
            const response = await this.http.get(`/BankingProduct/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<BankingProduct[]> => {
            const response = await this.http.get(`/BankingProduct/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: BankingProduct): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/create`, input);
            return response.data;
        },

        update: async (args: BankingProduct ): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/BankingProduct/delete/${id}`);
            return true;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/BankingProduct/getBank`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/assignBank`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/unassignBank`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getAccounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/BankingProduct/getAccounts/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/addToAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/removeFromAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getLoanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/BankingProduct/getLoanAccounts/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/addToLoanAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/removeFromLoanAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getPaymentCards: async (parentId: string,options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/BankingProduct/getPaymentCards/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/addToPaymentCards/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/removeFromPaymentCards/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    account = {
        find: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/Account/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Account/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: Account): Promise<Account> => {
            const response = await this.http.post(`/Account/create`, input);
            return response.data;
        },

        update: async (args: Account ): Promise<Account> => {
            const response = await this.http.put(`/Account/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Account/delete/${id}`);
            return true;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/Account/getBank`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/assignBank`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/unassignBank`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getBranch: async (parentId: string): Promise<Branch | null> => {
            const response = await this.http.put(`/Account/getBranch`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/assignBranch`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/unassignBranch`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getProduct: async (parentId: string): Promise<BankingProduct | null> => {
            const response = await this.http.put(`/Account/getProduct`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignProduct: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/assignProduct`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignProduct: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/unassignProduct`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getOwners: async (parentId: string,options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/Account/getOwners/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToOwners: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/addToOwners/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromOwners: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/removeFromOwners/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getTransactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/Account/getTransactions/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/addToTransactions/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/removeFromTransactions/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getStatements: async (parentId: string,options?: PaginationOptions): Promise<AccountStatement[]> => {
            const response = await this.http.get(`/Account/getStatements/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToStatements: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/addToStatements/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromStatements: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/removeFromStatements/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getStandingInstructions: async (parentId: string,options?: PaginationOptions): Promise<StandingInstruction[]> => {
            const response = await this.http.get(`/Account/getStandingInstructions/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToStandingInstructions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/addToStandingInstructions/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromStandingInstructions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/removeFromStandingInstructions/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getFeeCharges: async (parentId: string,options?: PaginationOptions): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/Account/getFeeCharges/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToFeeCharges: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/addToFeeCharges/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromFeeCharges: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/removeFromFeeCharges/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    accountStatement = {
        find: async (id: string): Promise<AccountStatement | null> => {
            const response = await this.http.get(`/AccountStatement/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<AccountStatement[]> => {
            const response = await this.http.get(`/AccountStatement/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: AccountStatement): Promise<AccountStatement> => {
            const response = await this.http.post(`/AccountStatement/create`, input);
            return response.data;
        },

        update: async (args: AccountStatement ): Promise<AccountStatement> => {
            const response = await this.http.put(`/AccountStatement/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/AccountStatement/delete/${id}`);
            return true;
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/AccountStatement/getAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/AccountStatement/assignAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/AccountStatement/unassignAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    transaction = {
        find: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/Transaction/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/Transaction/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: Transaction): Promise<Transaction> => {
            const response = await this.http.post(`/Transaction/create`, input);
            return response.data;
        },

        update: async (args: Transaction ): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Transaction/delete/${id}`);
            return true;
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/Transaction/getAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getExternalCounterparty: async (parentId: string): Promise<ExternalAccount | null> => {
            const response = await this.http.put(`/Transaction/getExternalCounterparty`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignExternalCounterparty: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignExternalCounterparty`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignExternalCounterparty: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignExternalCounterparty`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getPaymentCard: async (parentId: string): Promise<PaymentCard | null> => {
            const response = await this.http.put(`/Transaction/getPaymentCard`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignPaymentCard: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignPaymentCard`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignPaymentCard: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignPaymentCard`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getFundsTransfer: async (parentId: string): Promise<FundsTransfer | null> => {
            const response = await this.http.put(`/Transaction/getFundsTransfer`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignFundsTransfer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignFundsTransfer`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignFundsTransfer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignFundsTransfer`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getFxTrade: async (parentId: string): Promise<FXTrade | null> => {
            const response = await this.http.put(`/Transaction/getFxTrade`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignFxTrade: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignFxTrade`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignFxTrade: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignFxTrade`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getDispute: async (parentId: string): Promise<Dispute | null> => {
            const response = await this.http.put(`/Transaction/getDispute`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignDispute: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignDispute`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignDispute: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignDispute`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    externalAccount = {
        find: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/ExternalAccount/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<ExternalAccount[]> => {
            const response = await this.http.get(`/ExternalAccount/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: ExternalAccount): Promise<ExternalAccount> => {
            const response = await this.http.post(`/ExternalAccount/create`, input);
            return response.data;
        },

        update: async (args: ExternalAccount ): Promise<ExternalAccount> => {
            const response = await this.http.put(`/ExternalAccount/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ExternalAccount/delete/${id}`);
            return true;
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/ExternalAccount/getCustomer`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ExternalAccount/assignCustomer`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ExternalAccount/unassignCustomer`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getTransactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/ExternalAccount/getTransactions/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ExternalAccount/addToTransactions/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ExternalAccount/removeFromTransactions/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    fundsTransfer = {
        find: async (id: string): Promise<FundsTransfer | null> => {
            const response = await this.http.get(`/FundsTransfer/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<FundsTransfer[]> => {
            const response = await this.http.get(`/FundsTransfer/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: FundsTransfer): Promise<FundsTransfer> => {
            const response = await this.http.post(`/FundsTransfer/create`, input);
            return response.data;
        },

        update: async (args: FundsTransfer ): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/FundsTransfer/delete/${id}`);
            return true;
        },

        getSourceAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/FundsTransfer/getSourceAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignSourceAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/assignSourceAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignSourceAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/unassignSourceAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getDestinationAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/FundsTransfer/getDestinationAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignDestinationAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/assignDestinationAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignDestinationAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/unassignDestinationAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getExternalBeneficiary: async (parentId: string): Promise<ExternalAccount | null> => {
            const response = await this.http.put(`/FundsTransfer/getExternalBeneficiary`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignExternalBeneficiary: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/assignExternalBeneficiary`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignExternalBeneficiary: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/unassignExternalBeneficiary`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getInitiatedBy: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/FundsTransfer/getInitiatedBy`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignInitiatedBy: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/assignInitiatedBy`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignInitiatedBy: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/unassignInitiatedBy`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getTransactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/FundsTransfer/getTransactions/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/addToTransactions/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/removeFromTransactions/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    standingInstruction = {
        find: async (id: string): Promise<StandingInstruction | null> => {
            const response = await this.http.get(`/StandingInstruction/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<StandingInstruction[]> => {
            const response = await this.http.get(`/StandingInstruction/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: StandingInstruction): Promise<StandingInstruction> => {
            const response = await this.http.post(`/StandingInstruction/create`, input);
            return response.data;
        },

        update: async (args: StandingInstruction ): Promise<StandingInstruction> => {
            const response = await this.http.put(`/StandingInstruction/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/StandingInstruction/delete/${id}`);
            return true;
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/StandingInstruction/getAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/StandingInstruction/assignAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/StandingInstruction/unassignAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getBeneficiary: async (parentId: string): Promise<ExternalAccount | null> => {
            const response = await this.http.put(`/StandingInstruction/getBeneficiary`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBeneficiary: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/StandingInstruction/assignBeneficiary`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBeneficiary: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/StandingInstruction/unassignBeneficiary`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    paymentCard = {
        find: async (id: string): Promise<PaymentCard | null> => {
            const response = await this.http.get(`/PaymentCard/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/PaymentCard/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: PaymentCard): Promise<PaymentCard> => {
            const response = await this.http.post(`/PaymentCard/create`, input);
            return response.data;
        },

        update: async (args: PaymentCard ): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/PaymentCard/delete/${id}`);
            return true;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/PaymentCard/getBank`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/assignBank`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/unassignBank`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/PaymentCard/getAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/assignAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/unassignAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/PaymentCard/getCustomer`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/assignCustomer`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/unassignCustomer`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getTransactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/PaymentCard/getTransactions/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/addToTransactions/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/removeFromTransactions/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    loanAccount = {
        find: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/LoanAccount/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/LoanAccount/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: LoanAccount): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/create`, input);
            return response.data;
        },

        update: async (args: LoanAccount ): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/LoanAccount/delete/${id}`);
            return true;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/LoanAccount/getBank`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/assignBank`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/unassignBank`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getBranch: async (parentId: string): Promise<Branch | null> => {
            const response = await this.http.put(`/LoanAccount/getBranch`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/assignBranch`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/unassignBranch`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getProduct: async (parentId: string): Promise<BankingProduct | null> => {
            const response = await this.http.put(`/LoanAccount/getProduct`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignProduct: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/assignProduct`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignProduct: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/unassignProduct`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getBorrowers: async (parentId: string,options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/LoanAccount/getBorrowers/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToBorrowers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/addToBorrowers/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromBorrowers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/removeFromBorrowers/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getRepaymentSchedule: async (parentId: string,options?: PaginationOptions): Promise<RepaymentSchedule[]> => {
            const response = await this.http.get(`/LoanAccount/getRepaymentSchedule/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToRepaymentSchedule: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/addToRepaymentSchedule/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromRepaymentSchedule: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/removeFromRepaymentSchedule/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getPayments: async (parentId: string,options?: PaginationOptions): Promise<LoanPayment[]> => {
            const response = await this.http.get(`/LoanAccount/getPayments/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToPayments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/addToPayments/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromPayments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/removeFromPayments/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getCollateral: async (parentId: string,options?: PaginationOptions): Promise<Collateral[]> => {
            const response = await this.http.get(`/LoanAccount/getCollateral/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToCollateral: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/addToCollateral/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromCollateral: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/removeFromCollateral/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        getFeeCharges: async (parentId: string,options?: PaginationOptions): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/LoanAccount/getFeeCharges/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToFeeCharges: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/addToFeeCharges/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromFeeCharges: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/removeFromFeeCharges/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    repaymentSchedule = {
        find: async (id: string): Promise<RepaymentSchedule | null> => {
            const response = await this.http.get(`/RepaymentSchedule/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<RepaymentSchedule[]> => {
            const response = await this.http.get(`/RepaymentSchedule/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: RepaymentSchedule): Promise<RepaymentSchedule> => {
            const response = await this.http.post(`/RepaymentSchedule/create`, input);
            return response.data;
        },

        update: async (args: RepaymentSchedule ): Promise<RepaymentSchedule> => {
            const response = await this.http.put(`/RepaymentSchedule/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/RepaymentSchedule/delete/${id}`);
            return true;
        },

        getLoanAccount: async (parentId: string): Promise<LoanAccount | null> => {
            const response = await this.http.put(`/RepaymentSchedule/getLoanAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RepaymentSchedule/assignLoanAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RepaymentSchedule/unassignLoanAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getPayment: async (parentId: string): Promise<LoanPayment | null> => {
            const response = await this.http.put(`/RepaymentSchedule/getPayment`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignPayment: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RepaymentSchedule/assignPayment`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignPayment: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RepaymentSchedule/unassignPayment`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    loanPayment = {
        find: async (id: string): Promise<LoanPayment | null> => {
            const response = await this.http.get(`/LoanPayment/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<LoanPayment[]> => {
            const response = await this.http.get(`/LoanPayment/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: LoanPayment): Promise<LoanPayment> => {
            const response = await this.http.post(`/LoanPayment/create`, input);
            return response.data;
        },

        update: async (args: LoanPayment ): Promise<LoanPayment> => {
            const response = await this.http.put(`/LoanPayment/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/LoanPayment/delete/${id}`);
            return true;
        },

        getLoanAccount: async (parentId: string): Promise<LoanAccount | null> => {
            const response = await this.http.put(`/LoanPayment/getLoanAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanPayment/assignLoanAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanPayment/unassignLoanAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getTransaction: async (parentId: string): Promise<Transaction | null> => {
            const response = await this.http.put(`/LoanPayment/getTransaction`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanPayment/assignTransaction`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanPayment/unassignTransaction`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    collateral = {
        find: async (id: string): Promise<Collateral | null> => {
            const response = await this.http.get(`/Collateral/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<Collateral[]> => {
            const response = await this.http.get(`/Collateral/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: Collateral): Promise<Collateral> => {
            const response = await this.http.post(`/Collateral/create`, input);
            return response.data;
        },

        update: async (args: Collateral ): Promise<Collateral> => {
            const response = await this.http.put(`/Collateral/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Collateral/delete/${id}`);
            return true;
        },

        getLoanAccount: async (parentId: string): Promise<LoanAccount | null> => {
            const response = await this.http.put(`/Collateral/getLoanAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Collateral/assignLoanAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Collateral/unassignLoanAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    feeCharge = {
        find: async (id: string): Promise<FeeCharge | null> => {
            const response = await this.http.get(`/FeeCharge/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/FeeCharge/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: FeeCharge): Promise<FeeCharge> => {
            const response = await this.http.post(`/FeeCharge/create`, input);
            return response.data;
        },

        update: async (args: FeeCharge ): Promise<FeeCharge> => {
            const response = await this.http.put(`/FeeCharge/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/FeeCharge/delete/${id}`);
            return true;
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/FeeCharge/getAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FeeCharge/assignAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FeeCharge/unassignAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getLoanAccount: async (parentId: string): Promise<LoanAccount | null> => {
            const response = await this.http.put(`/FeeCharge/getLoanAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FeeCharge/assignLoanAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FeeCharge/unassignLoanAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    exchangeRate = {
        find: async (id: string): Promise<ExchangeRate | null> => {
            const response = await this.http.get(`/ExchangeRate/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<ExchangeRate[]> => {
            const response = await this.http.get(`/ExchangeRate/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: ExchangeRate): Promise<ExchangeRate> => {
            const response = await this.http.post(`/ExchangeRate/create`, input);
            return response.data;
        },

        update: async (args: ExchangeRate ): Promise<ExchangeRate> => {
            const response = await this.http.put(`/ExchangeRate/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ExchangeRate/delete/${id}`);
            return true;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/ExchangeRate/getBank`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ExchangeRate/assignBank`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ExchangeRate/unassignBank`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getFxTrades: async (parentId: string,options?: PaginationOptions): Promise<FXTrade[]> => {
            const response = await this.http.get(`/ExchangeRate/getFxTrades/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToFxTrades: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ExchangeRate/addToFxTrades/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromFxTrades: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ExchangeRate/removeFromFxTrades/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    fXTrade = {
        find: async (id: string): Promise<FXTrade | null> => {
            const response = await this.http.get(`/FXTrade/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<FXTrade[]> => {
            const response = await this.http.get(`/FXTrade/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: FXTrade): Promise<FXTrade> => {
            const response = await this.http.post(`/FXTrade/create`, input);
            return response.data;
        },

        update: async (args: FXTrade ): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/FXTrade/delete/${id}`);
            return true;
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/FXTrade/getCustomer`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignCustomer`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignCustomer`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/FXTrade/getBank`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignBank`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignBank`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getExchangeRate: async (parentId: string): Promise<ExchangeRate | null> => {
            const response = await this.http.put(`/FXTrade/getExchangeRate`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignExchangeRate: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignExchangeRate`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignExchangeRate: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignExchangeRate`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getSourceAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/FXTrade/getSourceAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignSourceAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignSourceAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignSourceAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignSourceAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getDestinationAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/FXTrade/getDestinationAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignDestinationAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignDestinationAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignDestinationAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignDestinationAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getTransaction: async (parentId: string): Promise<Transaction | null> => {
            const response = await this.http.put(`/FXTrade/getTransaction`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignTransaction`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignTransaction`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    dispute = {
        find: async (id: string): Promise<Dispute | null> => {
            const response = await this.http.get(`/Dispute/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<Dispute[]> => {
            const response = await this.http.get(`/Dispute/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: Dispute): Promise<Dispute> => {
            const response = await this.http.post(`/Dispute/create`, input);
            return response.data;
        },

        update: async (args: Dispute ): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Dispute/delete/${id}`);
            return true;
        },

        getTransaction: async (parentId: string): Promise<Transaction | null> => {
            const response = await this.http.put(`/Dispute/getTransaction`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/assignTransaction`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/unassignTransaction`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/Dispute/getCustomer`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/assignCustomer`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/unassignCustomer`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/Dispute/getAccount`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/assignAccount`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/unassignAccount`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getPaymentCard: async (parentId: string): Promise<PaymentCard | null> => {
            const response = await this.http.put(`/Dispute/getPaymentCard`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignPaymentCard: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/assignPaymentCard`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignPaymentCard: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/unassignPaymentCard`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },


};


    consent = {
        find: async (id: string): Promise<Consent | null> => {
            const response = await this.http.get(`/Consent/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/Consent/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: Consent): Promise<Consent> => {
            const response = await this.http.post(`/Consent/create`, input);
            return response.data;
        },

        update: async (args: Consent ): Promise<Consent> => {
            const response = await this.http.put(`/Consent/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Consent/delete/${id}`);
            return true;
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/Consent/getCustomer`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/assignCustomer`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/unassignCustomer`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/Consent/getBank`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/assignBank`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/unassignBank`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getThirdPartyProvider: async (parentId: string): Promise<ThirdPartyProvider | null> => {
            const response = await this.http.put(`/Consent/getThirdPartyProvider`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignThirdPartyProvider: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/assignThirdPartyProvider`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignThirdPartyProvider: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/unassignThirdPartyProvider`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getAuthorizedAccounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Consent/getAuthorizedAccounts/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToAuthorizedAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Consent/addToAuthorizedAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromAuthorizedAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Consent/removeFromAuthorizedAccounts/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};


    thirdPartyProvider = {
        find: async (id: string): Promise<ThirdPartyProvider | null> => {
            const response = await this.http.get(`/ThirdPartyProvider/get/${id}`);
            return response.data;
        },

        findAll: async (options?: PaginationOptions): Promise<ThirdPartyProvider[]> => {
            const response = await this.http.get(`/ThirdPartyProvider/`,
                {
                    params: options
                }
            );

            return response.data;
        },

        add: async ( input: ThirdPartyProvider): Promise<ThirdPartyProvider> => {
            const response = await this.http.post(`/ThirdPartyProvider/create`, input);
            return response.data;
        },

        update: async (args: ThirdPartyProvider ): Promise<ThirdPartyProvider> => {
            const response = await this.http.put(`/ThirdPartyProvider/update/`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ThirdPartyProvider/delete/${id}`);
            return true;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/ThirdPartyProvider/getBank`,
                {
                    parentId: parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ThirdPartyProvider/assignBank`,
                {
                    parentId: parentId,
                    childId: childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ThirdPartyProvider/unassignBank`,
                {
                    parentId: parentId,
                    childI: childId
                }
            );
        },

        getConsents: async (parentId: string,options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/ThirdPartyProvider/getConsents/`,
                {
                    parentId: parentId,
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ThirdPartyProvider/addToConsents/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },

        removeFromConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ThirdPartyProvider/removeFromConsents/`,
                {
                    parentId: parentId,
                    childIds: childIds
                }
            );
        },


};

}