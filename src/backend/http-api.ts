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

        findAll: async (paginationOptions?: PaginationOptions): Promise<Bank[]> => {
            const response = await this.http.get(`/Bank/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getBranches: async (parentId: string): Promise<Branch[]> => {
            const response = await this.http.get(`/Bank/getBranches/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToBranches: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToBranches/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromBranches: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromBranches/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getProducts: async (parentId: string): Promise<BankingProduct[]> => {
            const response = await this.http.get(`/Bank/getProducts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToProducts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToProducts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromProducts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromProducts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getCustomers: async (parentId: string): Promise<Customer[]> => {
            const response = await this.http.get(`/Bank/getCustomers/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToCustomers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToCustomers/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromCustomers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromCustomers/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getAccounts: async (parentId: string): Promise<Account[]> => {
            const response = await this.http.get(`/Bank/getAccounts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getPaymentCards: async (parentId: string): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/Bank/getPaymentCards/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToPaymentCards/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromPaymentCards/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getLoanAccounts: async (parentId: string): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Bank/getLoanAccounts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToLoanAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromLoanAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getExchangeRates: async (parentId: string): Promise<ExchangeRate[]> => {
            const response = await this.http.get(`/Bank/getExchangeRates/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToExchangeRates: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToExchangeRates/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromExchangeRates: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromExchangeRates/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getConsents: async (parentId: string): Promise<Consent[]> => {
            const response = await this.http.get(`/Bank/getConsents/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToConsents/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromConsents/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getThirdPartyProviders: async (parentId: string): Promise<ThirdPartyProvider[]> => {
            const response = await this.http.get(`/Bank/getThirdPartyProviders/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToThirdPartyProviders: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/addToThirdPartyProviders/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromThirdPartyProviders: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Bank/removeFromThirdPartyProviders/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    branch = {
        find: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/Branch/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Branch[]> => {
            const response = await this.http.get(`/Branch/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/Branch/getBank`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Branch/assignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Branch/unassignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        getAccounts: async (parentId: string): Promise<Account[]> => {
            const response = await this.http.get(`/Branch/getAccounts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/addToAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/removeFromAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getLoanAccounts: async (parentId: string): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Branch/getLoanAccounts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/addToLoanAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/removeFromLoanAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getAtms: async (parentId: string): Promise<ATM[]> => {
            const response = await this.http.get(`/Branch/getAtms/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToAtms: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/addToAtms/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromAtms: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Branch/removeFromAtms/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    aTM = {
        find: async (id: string): Promise<ATM | null> => {
            const response = await this.http.get(`/ATM/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<ATM[]> => {
            const response = await this.http.get(`/ATM/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getBranch: async (parentId: string): Promise<Branch | null> => {
            const response = await this.http.put(`/ATM/getBranch`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ATM/assignBranch`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ATM/unassignBranch`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    customer = {
        find: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/Customer/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/Customer/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/Customer/getBank`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Customer/assignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Customer/unassignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        getAccounts: async (parentId: string): Promise<Account[]> => {
            const response = await this.http.get(`/Customer/getAccounts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getLoanAccounts: async (parentId: string): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Customer/getLoanAccounts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToLoanAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromLoanAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getPaymentCards: async (parentId: string): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/Customer/getPaymentCards/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToPaymentCards/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromPaymentCards/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getExternalAccounts: async (parentId: string): Promise<ExternalAccount[]> => {
            const response = await this.http.get(`/Customer/getExternalAccounts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToExternalAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToExternalAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromExternalAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromExternalAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getFundsTransfers: async (parentId: string): Promise<FundsTransfer[]> => {
            const response = await this.http.get(`/Customer/getFundsTransfers/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToFundsTransfers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToFundsTransfers/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromFundsTransfers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromFundsTransfers/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getDisputes: async (parentId: string): Promise<Dispute[]> => {
            const response = await this.http.get(`/Customer/getDisputes/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToDisputes: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToDisputes/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromDisputes: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromDisputes/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getKycProfiles: async (parentId: string): Promise<KycProfile[]> => {
            const response = await this.http.get(`/Customer/getKycProfiles/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToKycProfiles: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToKycProfiles/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromKycProfiles: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromKycProfiles/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getConsents: async (parentId: string): Promise<Consent[]> => {
            const response = await this.http.get(`/Customer/getConsents/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/addToConsents/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Customer/removeFromConsents/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    kycProfile = {
        find: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/KycProfile/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<KycProfile[]> => {
            const response = await this.http.get(`/KycProfile/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/KycProfile/getCustomer`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/KycProfile/assignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/KycProfile/unassignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        getIdentityDocuments: async (parentId: string): Promise<IdentityDocument[]> => {
            const response = await this.http.get(`/KycProfile/getIdentityDocuments/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToIdentityDocuments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/addToIdentityDocuments/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromIdentityDocuments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/removeFromIdentityDocuments/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getRiskAssessments: async (parentId: string): Promise<RiskAssessment[]> => {
            const response = await this.http.get(`/KycProfile/getRiskAssessments/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToRiskAssessments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/addToRiskAssessments/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromRiskAssessments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/removeFromRiskAssessments/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getScreenings: async (parentId: string): Promise<ScreeningResult[]> => {
            const response = await this.http.get(`/KycProfile/getScreenings/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToScreenings: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/addToScreenings/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromScreenings: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/KycProfile/removeFromScreenings/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    identityDocument = {
        find: async (id: string): Promise<IdentityDocument | null> => {
            const response = await this.http.get(`/IdentityDocument/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<IdentityDocument[]> => {
            const response = await this.http.get(`/IdentityDocument/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getKycProfile: async (parentId: string): Promise<KycProfile | null> => {
            const response = await this.http.put(`/IdentityDocument/getKycProfile`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/IdentityDocument/assignKycProfile`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/IdentityDocument/unassignKycProfile`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    riskAssessment = {
        find: async (id: string): Promise<RiskAssessment | null> => {
            const response = await this.http.get(`/RiskAssessment/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<RiskAssessment[]> => {
            const response = await this.http.get(`/RiskAssessment/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getKycProfile: async (parentId: string): Promise<KycProfile | null> => {
            const response = await this.http.put(`/RiskAssessment/getKycProfile`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RiskAssessment/assignKycProfile`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RiskAssessment/unassignKycProfile`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    screeningResult = {
        find: async (id: string): Promise<ScreeningResult | null> => {
            const response = await this.http.get(`/ScreeningResult/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<ScreeningResult[]> => {
            const response = await this.http.get(`/ScreeningResult/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getKycProfile: async (parentId: string): Promise<KycProfile | null> => {
            const response = await this.http.put(`/ScreeningResult/getKycProfile`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ScreeningResult/assignKycProfile`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignKycProfile: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ScreeningResult/unassignKycProfile`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    bankingProduct = {
        find: async (id: string): Promise<BankingProduct | null> => {
            const response = await this.http.get(`/BankingProduct/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<BankingProduct[]> => {
            const response = await this.http.get(`/BankingProduct/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/BankingProduct/getBank`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/assignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/unassignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        getAccounts: async (parentId: string): Promise<Account[]> => {
            const response = await this.http.get(`/BankingProduct/getAccounts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/addToAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/removeFromAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getLoanAccounts: async (parentId: string): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/BankingProduct/getLoanAccounts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/addToLoanAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/removeFromLoanAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getPaymentCards: async (parentId: string): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/BankingProduct/getPaymentCards/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/addToPaymentCards/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromPaymentCards: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/BankingProduct/removeFromPaymentCards/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    account = {
        find: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/Account/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Account/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/Account/getBank`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/assignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/unassignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        getBranch: async (parentId: string): Promise<Branch | null> => {
            const response = await this.http.put(`/Account/getBranch`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/assignBranch`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/unassignBranch`,
                {
                    parentId,
                    childId
                }
            );
        },

        getProduct: async (parentId: string): Promise<BankingProduct | null> => {
            const response = await this.http.put(`/Account/getProduct`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignProduct: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/assignProduct`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignProduct: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Account/unassignProduct`,
                {
                    parentId,
                    childId
                }
            );
        },

        getOwners: async (parentId: string): Promise<Customer[]> => {
            const response = await this.http.get(`/Account/getOwners/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToOwners: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/addToOwners/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromOwners: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/removeFromOwners/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getTransactions: async (parentId: string): Promise<Transaction[]> => {
            const response = await this.http.get(`/Account/getTransactions/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/addToTransactions/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/removeFromTransactions/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getStatements: async (parentId: string): Promise<AccountStatement[]> => {
            const response = await this.http.get(`/Account/getStatements/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToStatements: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/addToStatements/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromStatements: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/removeFromStatements/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getStandingInstructions: async (parentId: string): Promise<StandingInstruction[]> => {
            const response = await this.http.get(`/Account/getStandingInstructions/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToStandingInstructions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/addToStandingInstructions/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromStandingInstructions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/removeFromStandingInstructions/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getFeeCharges: async (parentId: string): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/Account/getFeeCharges/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToFeeCharges: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/addToFeeCharges/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromFeeCharges: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Account/removeFromFeeCharges/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    accountStatement = {
        find: async (id: string): Promise<AccountStatement | null> => {
            const response = await this.http.get(`/AccountStatement/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<AccountStatement[]> => {
            const response = await this.http.get(`/AccountStatement/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/AccountStatement/getAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/AccountStatement/assignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/AccountStatement/unassignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    transaction = {
        find: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/Transaction/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/Transaction/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/Transaction/getAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        getExternalCounterparty: async (parentId: string): Promise<ExternalAccount | null> => {
            const response = await this.http.put(`/Transaction/getExternalCounterparty`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignExternalCounterparty: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignExternalCounterparty`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignExternalCounterparty: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignExternalCounterparty`,
                {
                    parentId,
                    childId
                }
            );
        },

        getPaymentCard: async (parentId: string): Promise<PaymentCard | null> => {
            const response = await this.http.put(`/Transaction/getPaymentCard`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignPaymentCard: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignPaymentCard`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignPaymentCard: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignPaymentCard`,
                {
                    parentId,
                    childId
                }
            );
        },

        getFundsTransfer: async (parentId: string): Promise<FundsTransfer | null> => {
            const response = await this.http.put(`/Transaction/getFundsTransfer`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignFundsTransfer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignFundsTransfer`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignFundsTransfer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignFundsTransfer`,
                {
                    parentId,
                    childId
                }
            );
        },

        getFxTrade: async (parentId: string): Promise<FXTrade | null> => {
            const response = await this.http.put(`/Transaction/getFxTrade`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignFxTrade: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignFxTrade`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignFxTrade: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignFxTrade`,
                {
                    parentId,
                    childId
                }
            );
        },

        getDispute: async (parentId: string): Promise<Dispute | null> => {
            const response = await this.http.put(`/Transaction/getDispute`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDispute: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/assignDispute`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignDispute: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Transaction/unassignDispute`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    externalAccount = {
        find: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/ExternalAccount/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<ExternalAccount[]> => {
            const response = await this.http.get(`/ExternalAccount/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/ExternalAccount/getCustomer`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ExternalAccount/assignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ExternalAccount/unassignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        getTransactions: async (parentId: string): Promise<Transaction[]> => {
            const response = await this.http.get(`/ExternalAccount/getTransactions/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ExternalAccount/addToTransactions/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ExternalAccount/removeFromTransactions/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    fundsTransfer = {
        find: async (id: string): Promise<FundsTransfer | null> => {
            const response = await this.http.get(`/FundsTransfer/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<FundsTransfer[]> => {
            const response = await this.http.get(`/FundsTransfer/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getSourceAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/FundsTransfer/getSourceAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignSourceAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/assignSourceAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignSourceAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/unassignSourceAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        getDestinationAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/FundsTransfer/getDestinationAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDestinationAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/assignDestinationAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignDestinationAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/unassignDestinationAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        getExternalBeneficiary: async (parentId: string): Promise<ExternalAccount | null> => {
            const response = await this.http.put(`/FundsTransfer/getExternalBeneficiary`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignExternalBeneficiary: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/assignExternalBeneficiary`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignExternalBeneficiary: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/unassignExternalBeneficiary`,
                {
                    parentId,
                    childId
                }
            );
        },

        getInitiatedBy: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/FundsTransfer/getInitiatedBy`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignInitiatedBy: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/assignInitiatedBy`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignInitiatedBy: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/unassignInitiatedBy`,
                {
                    parentId,
                    childId
                }
            );
        },

        getTransactions: async (parentId: string): Promise<Transaction[]> => {
            const response = await this.http.get(`/FundsTransfer/getTransactions/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/addToTransactions/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/FundsTransfer/removeFromTransactions/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    standingInstruction = {
        find: async (id: string): Promise<StandingInstruction | null> => {
            const response = await this.http.get(`/StandingInstruction/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<StandingInstruction[]> => {
            const response = await this.http.get(`/StandingInstruction/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/StandingInstruction/getAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/StandingInstruction/assignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/StandingInstruction/unassignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        getBeneficiary: async (parentId: string): Promise<ExternalAccount | null> => {
            const response = await this.http.put(`/StandingInstruction/getBeneficiary`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBeneficiary: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/StandingInstruction/assignBeneficiary`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBeneficiary: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/StandingInstruction/unassignBeneficiary`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    paymentCard = {
        find: async (id: string): Promise<PaymentCard | null> => {
            const response = await this.http.get(`/PaymentCard/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/PaymentCard/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/PaymentCard/getBank`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/assignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/unassignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/PaymentCard/getAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/assignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/unassignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/PaymentCard/getCustomer`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/assignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/unassignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        getTransactions: async (parentId: string): Promise<Transaction[]> => {
            const response = await this.http.get(`/PaymentCard/getTransactions/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/addToTransactions/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/PaymentCard/removeFromTransactions/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    loanAccount = {
        find: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/LoanAccount/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/LoanAccount/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/LoanAccount/getBank`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/assignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/unassignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        getBranch: async (parentId: string): Promise<Branch | null> => {
            const response = await this.http.put(`/LoanAccount/getBranch`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/assignBranch`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBranch: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/unassignBranch`,
                {
                    parentId,
                    childId
                }
            );
        },

        getProduct: async (parentId: string): Promise<BankingProduct | null> => {
            const response = await this.http.put(`/LoanAccount/getProduct`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignProduct: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/assignProduct`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignProduct: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/unassignProduct`,
                {
                    parentId,
                    childId
                }
            );
        },

        getBorrowers: async (parentId: string): Promise<Customer[]> => {
            const response = await this.http.get(`/LoanAccount/getBorrowers/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToBorrowers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/addToBorrowers/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromBorrowers: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/removeFromBorrowers/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getRepaymentSchedule: async (parentId: string): Promise<RepaymentSchedule[]> => {
            const response = await this.http.get(`/LoanAccount/getRepaymentSchedule/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToRepaymentSchedule: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/addToRepaymentSchedule/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromRepaymentSchedule: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/removeFromRepaymentSchedule/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getPayments: async (parentId: string): Promise<LoanPayment[]> => {
            const response = await this.http.get(`/LoanAccount/getPayments/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToPayments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/addToPayments/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromPayments: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/removeFromPayments/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getCollateral: async (parentId: string): Promise<Collateral[]> => {
            const response = await this.http.get(`/LoanAccount/getCollateral/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToCollateral: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/addToCollateral/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromCollateral: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/removeFromCollateral/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        getFeeCharges: async (parentId: string): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/LoanAccount/getFeeCharges/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToFeeCharges: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/addToFeeCharges/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromFeeCharges: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/LoanAccount/removeFromFeeCharges/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    repaymentSchedule = {
        find: async (id: string): Promise<RepaymentSchedule | null> => {
            const response = await this.http.get(`/RepaymentSchedule/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<RepaymentSchedule[]> => {
            const response = await this.http.get(`/RepaymentSchedule/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getLoanAccount: async (parentId: string): Promise<LoanAccount | null> => {
            const response = await this.http.put(`/RepaymentSchedule/getLoanAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RepaymentSchedule/assignLoanAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RepaymentSchedule/unassignLoanAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        getPayment: async (parentId: string): Promise<LoanPayment | null> => {
            const response = await this.http.put(`/RepaymentSchedule/getPayment`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignPayment: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RepaymentSchedule/assignPayment`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignPayment: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/RepaymentSchedule/unassignPayment`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    loanPayment = {
        find: async (id: string): Promise<LoanPayment | null> => {
            const response = await this.http.get(`/LoanPayment/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<LoanPayment[]> => {
            const response = await this.http.get(`/LoanPayment/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getLoanAccount: async (parentId: string): Promise<LoanAccount | null> => {
            const response = await this.http.put(`/LoanPayment/getLoanAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanPayment/assignLoanAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanPayment/unassignLoanAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        getTransaction: async (parentId: string): Promise<Transaction | null> => {
            const response = await this.http.put(`/LoanPayment/getTransaction`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanPayment/assignTransaction`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/LoanPayment/unassignTransaction`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    collateral = {
        find: async (id: string): Promise<Collateral | null> => {
            const response = await this.http.get(`/Collateral/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Collateral[]> => {
            const response = await this.http.get(`/Collateral/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getLoanAccount: async (parentId: string): Promise<LoanAccount | null> => {
            const response = await this.http.put(`/Collateral/getLoanAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Collateral/assignLoanAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Collateral/unassignLoanAccount`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    feeCharge = {
        find: async (id: string): Promise<FeeCharge | null> => {
            const response = await this.http.get(`/FeeCharge/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/FeeCharge/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/FeeCharge/getAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FeeCharge/assignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FeeCharge/unassignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        getLoanAccount: async (parentId: string): Promise<LoanAccount | null> => {
            const response = await this.http.put(`/FeeCharge/getLoanAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FeeCharge/assignLoanAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignLoanAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FeeCharge/unassignLoanAccount`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    exchangeRate = {
        find: async (id: string): Promise<ExchangeRate | null> => {
            const response = await this.http.get(`/ExchangeRate/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<ExchangeRate[]> => {
            const response = await this.http.get(`/ExchangeRate/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/ExchangeRate/getBank`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ExchangeRate/assignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ExchangeRate/unassignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        getFxTrades: async (parentId: string): Promise<FXTrade[]> => {
            const response = await this.http.get(`/ExchangeRate/getFxTrades/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToFxTrades: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ExchangeRate/addToFxTrades/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromFxTrades: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ExchangeRate/removeFromFxTrades/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    fXTrade = {
        find: async (id: string): Promise<FXTrade | null> => {
            const response = await this.http.get(`/FXTrade/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<FXTrade[]> => {
            const response = await this.http.get(`/FXTrade/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/FXTrade/getCustomer`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/FXTrade/getBank`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        getExchangeRate: async (parentId: string): Promise<ExchangeRate | null> => {
            const response = await this.http.put(`/FXTrade/getExchangeRate`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignExchangeRate: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignExchangeRate`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignExchangeRate: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignExchangeRate`,
                {
                    parentId,
                    childId
                }
            );
        },

        getSourceAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/FXTrade/getSourceAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignSourceAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignSourceAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignSourceAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignSourceAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        getDestinationAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/FXTrade/getDestinationAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignDestinationAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignDestinationAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignDestinationAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignDestinationAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        getTransaction: async (parentId: string): Promise<Transaction | null> => {
            const response = await this.http.put(`/FXTrade/getTransaction`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/assignTransaction`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/FXTrade/unassignTransaction`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    dispute = {
        find: async (id: string): Promise<Dispute | null> => {
            const response = await this.http.get(`/Dispute/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Dispute[]> => {
            const response = await this.http.get(`/Dispute/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getTransaction: async (parentId: string): Promise<Transaction | null> => {
            const response = await this.http.put(`/Dispute/getTransaction`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/assignTransaction`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignTransaction: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/unassignTransaction`,
                {
                    parentId,
                    childId
                }
            );
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/Dispute/getCustomer`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/assignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/unassignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        getAccount: async (parentId: string): Promise<Account | null> => {
            const response = await this.http.put(`/Dispute/getAccount`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/assignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignAccount: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/unassignAccount`,
                {
                    parentId,
                    childId
                }
            );
        },

        getPaymentCard: async (parentId: string): Promise<PaymentCard | null> => {
            const response = await this.http.put(`/Dispute/getPaymentCard`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignPaymentCard: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/assignPaymentCard`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignPaymentCard: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Dispute/unassignPaymentCard`,
                {
                    parentId,
                    childId
                }
            );
        },


};


    consent = {
        find: async (id: string): Promise<Consent | null> => {
            const response = await this.http.get(`/Consent/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/Consent/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getCustomer: async (parentId: string): Promise<Customer | null> => {
            const response = await this.http.put(`/Consent/getCustomer`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/assignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignCustomer: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/unassignCustomer`,
                {
                    parentId,
                    childId
                }
            );
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/Consent/getBank`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/assignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/unassignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        getThirdPartyProvider: async (parentId: string): Promise<ThirdPartyProvider | null> => {
            const response = await this.http.put(`/Consent/getThirdPartyProvider`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignThirdPartyProvider: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/assignThirdPartyProvider`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignThirdPartyProvider: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/Consent/unassignThirdPartyProvider`,
                {
                    parentId,
                    childId
                }
            );
        },

        getAuthorizedAccounts: async (parentId: string): Promise<Account[]> => {
            const response = await this.http.get(`/Consent/getAuthorizedAccounts/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToAuthorizedAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Consent/addToAuthorizedAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromAuthorizedAccounts: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/Consent/removeFromAuthorizedAccounts/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};


    thirdPartyProvider = {
        find: async (id: string): Promise<ThirdPartyProvider | null> => {
            const response = await this.http.get(`/ThirdPartyProvider/get/${id}`);
            return response.data;
        },

        findAll: async (paginationOptions?: PaginationOptions): Promise<ThirdPartyProvider[]> => {
            const response = await this.http.get(`/ThirdPartyProvider/`,
                {
                    paginationOptions
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
            return response.data;
        },

        getBank: async (parentId: string): Promise<Bank | null> => {
            const response = await this.http.put(`/ThirdPartyProvider/getBank`,
                {
                    parentId
                }
            );
            return response.data;
        },

        assignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ThirdPartyProvider/assignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        unassignBank: async (parentId: string,childId: string): Promise<void> => {
            const response = await this.http.put(`/ThirdPartyProvider/unassignBank`,
                {
                    parentId,
                    childId
                }
            );
        },

        getConsents: async (parentId: string): Promise<Consent[]> => {
            const response = await this.http.get(`/ThirdPartyProvider/getConsents/`,
                {
                    parentId
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ThirdPartyProvider/addToConsents/`,
                {
                    parentId,
                    childIds
                }
            );
        },

        removeFromConsents: async (parentId: string,childIds: string[]): Promise<void> => {
            const response = await this.http.put(`/ThirdPartyProvider/removeFromConsents/`,
                {
                    parentId,
                    childIds
                }
            );
        },


};

}