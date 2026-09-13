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
            const response = await this.http.get(`/Bank/getBranches/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToBranches: async (parentId: string,input: Branch): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addToBranches/${parentId}/`,input);
            return response.data;
        },

        removeFromBranches: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFromBranches/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getProducts: async (parentId: string,options?: PaginationOptions): Promise<BankingProduct[]> => {
            const response = await this.http.get(`/Bank/getProducts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToProducts: async (parentId: string,input: BankingProduct): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addToProducts/${parentId}/`,input);
            return response.data;
        },

        removeFromProducts: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFromProducts/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getCustomers: async (parentId: string,options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/Bank/getCustomers/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToCustomers: async (parentId: string,input: Customer): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addToCustomers/${parentId}/`,input);
            return response.data;
        },

        removeFromCustomers: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFromCustomers/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getAccounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Bank/getAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,input: Account): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addToAccounts/${parentId}/`,input);
            return response.data;
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFromAccounts/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getPaymentCards: async (parentId: string,options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/Bank/getPaymentCards/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,input: PaymentCard): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addToPaymentCards/${parentId}/`,input);
            return response.data;
        },

        removeFromPaymentCards: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFromPaymentCards/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getLoanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Bank/getLoanAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,input: LoanAccount): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addToLoanAccounts/${parentId}/`,input);
            return response.data;
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFromLoanAccounts/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getExchangeRates: async (parentId: string,options?: PaginationOptions): Promise<ExchangeRate[]> => {
            const response = await this.http.get(`/Bank/getExchangeRates/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToExchangeRates: async (parentId: string,input: ExchangeRate): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addToExchangeRates/${parentId}/`,input);
            return response.data;
        },

        removeFromExchangeRates: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFromExchangeRates/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getConsents: async (parentId: string,options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/Bank/getConsents/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,input: Consent): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addToConsents/${parentId}/`,input);
            return response.data;
        },

        removeFromConsents: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFromConsents/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getThirdPartyProviders: async (parentId: string,options?: PaginationOptions): Promise<ThirdPartyProvider[]> => {
            const response = await this.http.get(`/Bank/getThirdPartyProviders/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToThirdPartyProviders: async (parentId: string,input: ThirdPartyProvider): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addToThirdPartyProviders/${parentId}/`,input);
            return response.data;
        },

        removeFromThirdPartyProviders: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFromThirdPartyProviders/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getBank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Branch/getBank/${id}`);
            return response.data;
        },

        assignBank: async (id: string, bankId: string): Promise<Branch> => {
            const response = await this.http.put(`/Branch/assignBank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<Branch> => {
            const response = await this.http.delete(`/Branch/unassignBank/${id}`);
            return response.data;
        },

        getAccounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Branch/getAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,input: Account): Promise<Branch> => {
            const response = await this.http.post(`/Branch/addToAccounts/${parentId}/`,input);
            return response.data;
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/removeFromAccounts/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getLoanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Branch/getLoanAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,input: LoanAccount): Promise<Branch> => {
            const response = await this.http.post(`/Branch/addToLoanAccounts/${parentId}/`,input);
            return response.data;
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/removeFromLoanAccounts/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getAtms: async (parentId: string,options?: PaginationOptions): Promise<ATM[]> => {
            const response = await this.http.get(`/Branch/getAtms/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAtms: async (parentId: string,input: ATM): Promise<Branch> => {
            const response = await this.http.post(`/Branch/addToAtms/${parentId}/`,input);
            return response.data;
        },

        removeFromAtms: async (parentId: string,childIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/removeFromAtms/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getBranch: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/ATM/getBranch/${id}`);
            return response.data;
        },

        assignBranch: async (id: string, branchId: string): Promise<ATM> => {
            const response = await this.http.put(`/ATM/assignBranch/${id}`,
                {
                    id: branchId
                }
            );
            return response.data;
        },

        unassignBranch: async (id: string ): Promise<ATM> => {
            const response = await this.http.delete(`/ATM/unassignBranch/${id}`);
            return response.data;
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

        getBank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Customer/getBank/${id}`);
            return response.data;
        },

        assignBank: async (id: string, bankId: string): Promise<Customer> => {
            const response = await this.http.put(`/Customer/assignBank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<Customer> => {
            const response = await this.http.delete(`/Customer/unassignBank/${id}`);
            return response.data;
        },

        getAccounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Customer/getAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,input: Account): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addToAccounts/${parentId}/`,input);
            return response.data;
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFromAccounts/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getLoanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Customer/getLoanAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,input: LoanAccount): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addToLoanAccounts/${parentId}/`,input);
            return response.data;
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFromLoanAccounts/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getPaymentCards: async (parentId: string,options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/Customer/getPaymentCards/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,input: PaymentCard): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addToPaymentCards/${parentId}/`,input);
            return response.data;
        },

        removeFromPaymentCards: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFromPaymentCards/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getExternalAccounts: async (parentId: string,options?: PaginationOptions): Promise<ExternalAccount[]> => {
            const response = await this.http.get(`/Customer/getExternalAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToExternalAccounts: async (parentId: string,input: ExternalAccount): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addToExternalAccounts/${parentId}/`,input);
            return response.data;
        },

        removeFromExternalAccounts: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFromExternalAccounts/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getFundsTransfers: async (parentId: string,options?: PaginationOptions): Promise<FundsTransfer[]> => {
            const response = await this.http.get(`/Customer/getFundsTransfers/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFundsTransfers: async (parentId: string,input: FundsTransfer): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addToFundsTransfers/${parentId}/`,input);
            return response.data;
        },

        removeFromFundsTransfers: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFromFundsTransfers/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getDisputes: async (parentId: string,options?: PaginationOptions): Promise<Dispute[]> => {
            const response = await this.http.get(`/Customer/getDisputes/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToDisputes: async (parentId: string,input: Dispute): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addToDisputes/${parentId}/`,input);
            return response.data;
        },

        removeFromDisputes: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFromDisputes/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getKycProfiles: async (parentId: string,options?: PaginationOptions): Promise<KycProfile[]> => {
            const response = await this.http.get(`/Customer/getKycProfiles/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToKycProfiles: async (parentId: string,input: KycProfile): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addToKycProfiles/${parentId}/`,input);
            return response.data;
        },

        removeFromKycProfiles: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFromKycProfiles/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getConsents: async (parentId: string,options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/Customer/getConsents/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,input: Consent): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addToConsents/${parentId}/`,input);
            return response.data;
        },

        removeFromConsents: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFromConsents/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getCustomer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/KycProfile/getCustomer/${id}`);
            return response.data;
        },

        assignCustomer: async (id: string, customerId: string): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/assignCustomer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<KycProfile> => {
            const response = await this.http.delete(`/KycProfile/unassignCustomer/${id}`);
            return response.data;
        },

        getIdentityDocuments: async (parentId: string,options?: PaginationOptions): Promise<IdentityDocument[]> => {
            const response = await this.http.get(`/KycProfile/getIdentityDocuments/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToIdentityDocuments: async (parentId: string,input: IdentityDocument): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/addToIdentityDocuments/${parentId}/`,input);
            return response.data;
        },

        removeFromIdentityDocuments: async (parentId: string,childIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/removeFromIdentityDocuments/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getRiskAssessments: async (parentId: string,options?: PaginationOptions): Promise<RiskAssessment[]> => {
            const response = await this.http.get(`/KycProfile/getRiskAssessments/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToRiskAssessments: async (parentId: string,input: RiskAssessment): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/addToRiskAssessments/${parentId}/`,input);
            return response.data;
        },

        removeFromRiskAssessments: async (parentId: string,childIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/removeFromRiskAssessments/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getScreenings: async (parentId: string,options?: PaginationOptions): Promise<ScreeningResult[]> => {
            const response = await this.http.get(`/KycProfile/getScreenings/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToScreenings: async (parentId: string,input: ScreeningResult): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/addToScreenings/${parentId}/`,input);
            return response.data;
        },

        removeFromScreenings: async (parentId: string,childIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/removeFromScreenings/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getKycProfile: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/IdentityDocument/getKycProfile/${id}`);
            return response.data;
        },

        assignKycProfile: async (id: string, kycProfileId: string): Promise<IdentityDocument> => {
            const response = await this.http.put(`/IdentityDocument/assignKycProfile/${id}`,
                {
                    id: kycProfileId
                }
            );
            return response.data;
        },

        unassignKycProfile: async (id: string ): Promise<IdentityDocument> => {
            const response = await this.http.delete(`/IdentityDocument/unassignKycProfile/${id}`);
            return response.data;
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

        getKycProfile: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/RiskAssessment/getKycProfile/${id}`);
            return response.data;
        },

        assignKycProfile: async (id: string, kycProfileId: string): Promise<RiskAssessment> => {
            const response = await this.http.put(`/RiskAssessment/assignKycProfile/${id}`,
                {
                    id: kycProfileId
                }
            );
            return response.data;
        },

        unassignKycProfile: async (id: string ): Promise<RiskAssessment> => {
            const response = await this.http.delete(`/RiskAssessment/unassignKycProfile/${id}`);
            return response.data;
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

        getKycProfile: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/ScreeningResult/getKycProfile/${id}`);
            return response.data;
        },

        assignKycProfile: async (id: string, kycProfileId: string): Promise<ScreeningResult> => {
            const response = await this.http.put(`/ScreeningResult/assignKycProfile/${id}`,
                {
                    id: kycProfileId
                }
            );
            return response.data;
        },

        unassignKycProfile: async (id: string ): Promise<ScreeningResult> => {
            const response = await this.http.delete(`/ScreeningResult/unassignKycProfile/${id}`);
            return response.data;
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

        getBank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/BankingProduct/getBank/${id}`);
            return response.data;
        },

        assignBank: async (id: string, bankId: string): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/assignBank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<BankingProduct> => {
            const response = await this.http.delete(`/BankingProduct/unassignBank/${id}`);
            return response.data;
        },

        getAccounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/BankingProduct/getAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,input: Account): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/addToAccounts/${parentId}/`,input);
            return response.data;
        },

        removeFromAccounts: async (parentId: string,childIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/removeFromAccounts/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getLoanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/BankingProduct/getLoanAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,input: LoanAccount): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/addToLoanAccounts/${parentId}/`,input);
            return response.data;
        },

        removeFromLoanAccounts: async (parentId: string,childIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/removeFromLoanAccounts/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getPaymentCards: async (parentId: string,options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/BankingProduct/getPaymentCards/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,input: PaymentCard): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/addToPaymentCards/${parentId}/`,input);
            return response.data;
        },

        removeFromPaymentCards: async (parentId: string,childIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/removeFromPaymentCards/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getBank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Account/getBank/${id}`);
            return response.data;
        },

        assignBank: async (id: string, bankId: string): Promise<Account> => {
            const response = await this.http.put(`/Account/assignBank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<Account> => {
            const response = await this.http.delete(`/Account/unassignBank/${id}`);
            return response.data;
        },

        getBranch: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/Account/getBranch/${id}`);
            return response.data;
        },

        assignBranch: async (id: string, branchId: string): Promise<Account> => {
            const response = await this.http.put(`/Account/assignBranch/${id}`,
                {
                    id: branchId
                }
            );
            return response.data;
        },

        unassignBranch: async (id: string ): Promise<Account> => {
            const response = await this.http.delete(`/Account/unassignBranch/${id}`);
            return response.data;
        },

        getProduct: async (id: string): Promise<BankingProduct | null> => {
            const response = await this.http.get(`/Account/getProduct/${id}`);
            return response.data;
        },

        assignProduct: async (id: string, productId: string): Promise<Account> => {
            const response = await this.http.put(`/Account/assignProduct/${id}`,
                {
                    id: productId
                }
            );
            return response.data;
        },

        unassignProduct: async (id: string ): Promise<Account> => {
            const response = await this.http.delete(`/Account/unassignProduct/${id}`);
            return response.data;
        },

        getOwners: async (parentId: string,options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/Account/getOwners/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToOwners: async (parentId: string,input: Customer): Promise<Account> => {
            const response = await this.http.post(`/Account/addToOwners/${parentId}/`,input);
            return response.data;
        },

        removeFromOwners: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/removeFromOwners/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getTransactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/Account/getTransactions/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,input: Transaction): Promise<Account> => {
            const response = await this.http.post(`/Account/addToTransactions/${parentId}/`,input);
            return response.data;
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/removeFromTransactions/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getStatements: async (parentId: string,options?: PaginationOptions): Promise<AccountStatement[]> => {
            const response = await this.http.get(`/Account/getStatements/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToStatements: async (parentId: string,input: AccountStatement): Promise<Account> => {
            const response = await this.http.post(`/Account/addToStatements/${parentId}/`,input);
            return response.data;
        },

        removeFromStatements: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/removeFromStatements/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getStandingInstructions: async (parentId: string,options?: PaginationOptions): Promise<StandingInstruction[]> => {
            const response = await this.http.get(`/Account/getStandingInstructions/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToStandingInstructions: async (parentId: string,input: StandingInstruction): Promise<Account> => {
            const response = await this.http.post(`/Account/addToStandingInstructions/${parentId}/`,input);
            return response.data;
        },

        removeFromStandingInstructions: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/removeFromStandingInstructions/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getFeeCharges: async (parentId: string,options?: PaginationOptions): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/Account/getFeeCharges/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFeeCharges: async (parentId: string,input: FeeCharge): Promise<Account> => {
            const response = await this.http.post(`/Account/addToFeeCharges/${parentId}/`,input);
            return response.data;
        },

        removeFromFeeCharges: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/removeFromFeeCharges/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/AccountStatement/getAccount/${id}`);
            return response.data;
        },

        assignAccount: async (id: string, accountId: string): Promise<AccountStatement> => {
            const response = await this.http.put(`/AccountStatement/assignAccount/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<AccountStatement> => {
            const response = await this.http.delete(`/AccountStatement/unassignAccount/${id}`);
            return response.data;
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

        getAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/Transaction/getAccount/${id}`);
            return response.data;
        },

        assignAccount: async (id: string, accountId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignAccount/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignAccount/${id}`);
            return response.data;
        },

        getExternalCounterparty: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/Transaction/getExternalCounterparty/${id}`);
            return response.data;
        },

        assignExternalCounterparty: async (id: string, externalCounterpartyId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignExternalCounterparty/${id}`,
                {
                    id: externalCounterpartyId
                }
            );
            return response.data;
        },

        unassignExternalCounterparty: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignExternalCounterparty/${id}`);
            return response.data;
        },

        getPaymentCard: async (id: string): Promise<PaymentCard | null> => {
            const response = await this.http.get(`/Transaction/getPaymentCard/${id}`);
            return response.data;
        },

        assignPaymentCard: async (id: string, paymentCardId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignPaymentCard/${id}`,
                {
                    id: paymentCardId
                }
            );
            return response.data;
        },

        unassignPaymentCard: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignPaymentCard/${id}`);
            return response.data;
        },

        getFundsTransfer: async (id: string): Promise<FundsTransfer | null> => {
            const response = await this.http.get(`/Transaction/getFundsTransfer/${id}`);
            return response.data;
        },

        assignFundsTransfer: async (id: string, fundsTransferId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignFundsTransfer/${id}`,
                {
                    id: fundsTransferId
                }
            );
            return response.data;
        },

        unassignFundsTransfer: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignFundsTransfer/${id}`);
            return response.data;
        },

        getFxTrade: async (id: string): Promise<FXTrade | null> => {
            const response = await this.http.get(`/Transaction/getFxTrade/${id}`);
            return response.data;
        },

        assignFxTrade: async (id: string, fxTradeId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignFxTrade/${id}`,
                {
                    id: fxTradeId
                }
            );
            return response.data;
        },

        unassignFxTrade: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignFxTrade/${id}`);
            return response.data;
        },

        getDispute: async (id: string): Promise<Dispute | null> => {
            const response = await this.http.get(`/Transaction/getDispute/${id}`);
            return response.data;
        },

        assignDispute: async (id: string, disputeId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignDispute/${id}`,
                {
                    id: disputeId
                }
            );
            return response.data;
        },

        unassignDispute: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignDispute/${id}`);
            return response.data;
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

        getCustomer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/ExternalAccount/getCustomer/${id}`);
            return response.data;
        },

        assignCustomer: async (id: string, customerId: string): Promise<ExternalAccount> => {
            const response = await this.http.put(`/ExternalAccount/assignCustomer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<ExternalAccount> => {
            const response = await this.http.delete(`/ExternalAccount/unassignCustomer/${id}`);
            return response.data;
        },

        getTransactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/ExternalAccount/getTransactions/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,input: Transaction): Promise<ExternalAccount> => {
            const response = await this.http.post(`/ExternalAccount/addToTransactions/${parentId}/`,input);
            return response.data;
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<ExternalAccount> => {
            const response = await this.http.put(`/ExternalAccount/removeFromTransactions/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getSourceAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FundsTransfer/getSourceAccount/${id}`);
            return response.data;
        },

        assignSourceAccount: async (id: string, sourceAccountId: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/assignSourceAccount/${id}`,
                {
                    id: sourceAccountId
                }
            );
            return response.data;
        },

        unassignSourceAccount: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer/unassignSourceAccount/${id}`);
            return response.data;
        },

        getDestinationAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FundsTransfer/getDestinationAccount/${id}`);
            return response.data;
        },

        assignDestinationAccount: async (id: string, destinationAccountId: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/assignDestinationAccount/${id}`,
                {
                    id: destinationAccountId
                }
            );
            return response.data;
        },

        unassignDestinationAccount: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer/unassignDestinationAccount/${id}`);
            return response.data;
        },

        getExternalBeneficiary: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/FundsTransfer/getExternalBeneficiary/${id}`);
            return response.data;
        },

        assignExternalBeneficiary: async (id: string, externalBeneficiaryId: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/assignExternalBeneficiary/${id}`,
                {
                    id: externalBeneficiaryId
                }
            );
            return response.data;
        },

        unassignExternalBeneficiary: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer/unassignExternalBeneficiary/${id}`);
            return response.data;
        },

        getInitiatedBy: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/FundsTransfer/getInitiatedBy/${id}`);
            return response.data;
        },

        assignInitiatedBy: async (id: string, initiatedById: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/assignInitiatedBy/${id}`,
                {
                    id: initiatedById
                }
            );
            return response.data;
        },

        unassignInitiatedBy: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer/unassignInitiatedBy/${id}`);
            return response.data;
        },

        getTransactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/FundsTransfer/getTransactions/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,input: Transaction): Promise<FundsTransfer> => {
            const response = await this.http.post(`/FundsTransfer/addToTransactions/${parentId}/`,input);
            return response.data;
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/removeFromTransactions/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/StandingInstruction/getAccount/${id}`);
            return response.data;
        },

        assignAccount: async (id: string, accountId: string): Promise<StandingInstruction> => {
            const response = await this.http.put(`/StandingInstruction/assignAccount/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<StandingInstruction> => {
            const response = await this.http.delete(`/StandingInstruction/unassignAccount/${id}`);
            return response.data;
        },

        getBeneficiary: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/StandingInstruction/getBeneficiary/${id}`);
            return response.data;
        },

        assignBeneficiary: async (id: string, beneficiaryId: string): Promise<StandingInstruction> => {
            const response = await this.http.put(`/StandingInstruction/assignBeneficiary/${id}`,
                {
                    id: beneficiaryId
                }
            );
            return response.data;
        },

        unassignBeneficiary: async (id: string ): Promise<StandingInstruction> => {
            const response = await this.http.delete(`/StandingInstruction/unassignBeneficiary/${id}`);
            return response.data;
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

        getBank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/PaymentCard/getBank/${id}`);
            return response.data;
        },

        assignBank: async (id: string, bankId: string): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/assignBank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<PaymentCard> => {
            const response = await this.http.delete(`/PaymentCard/unassignBank/${id}`);
            return response.data;
        },

        getAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/PaymentCard/getAccount/${id}`);
            return response.data;
        },

        assignAccount: async (id: string, accountId: string): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/assignAccount/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<PaymentCard> => {
            const response = await this.http.delete(`/PaymentCard/unassignAccount/${id}`);
            return response.data;
        },

        getCustomer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/PaymentCard/getCustomer/${id}`);
            return response.data;
        },

        assignCustomer: async (id: string, customerId: string): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/assignCustomer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<PaymentCard> => {
            const response = await this.http.delete(`/PaymentCard/unassignCustomer/${id}`);
            return response.data;
        },

        getTransactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/PaymentCard/getTransactions/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,input: Transaction): Promise<PaymentCard> => {
            const response = await this.http.post(`/PaymentCard/addToTransactions/${parentId}/`,input);
            return response.data;
        },

        removeFromTransactions: async (parentId: string,childIds: string[]): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/removeFromTransactions/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getBank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/LoanAccount/getBank/${id}`);
            return response.data;
        },

        assignBank: async (id: string, bankId: string): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/assignBank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<LoanAccount> => {
            const response = await this.http.delete(`/LoanAccount/unassignBank/${id}`);
            return response.data;
        },

        getBranch: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/LoanAccount/getBranch/${id}`);
            return response.data;
        },

        assignBranch: async (id: string, branchId: string): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/assignBranch/${id}`,
                {
                    id: branchId
                }
            );
            return response.data;
        },

        unassignBranch: async (id: string ): Promise<LoanAccount> => {
            const response = await this.http.delete(`/LoanAccount/unassignBranch/${id}`);
            return response.data;
        },

        getProduct: async (id: string): Promise<BankingProduct | null> => {
            const response = await this.http.get(`/LoanAccount/getProduct/${id}`);
            return response.data;
        },

        assignProduct: async (id: string, productId: string): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/assignProduct/${id}`,
                {
                    id: productId
                }
            );
            return response.data;
        },

        unassignProduct: async (id: string ): Promise<LoanAccount> => {
            const response = await this.http.delete(`/LoanAccount/unassignProduct/${id}`);
            return response.data;
        },

        getBorrowers: async (parentId: string,options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/LoanAccount/getBorrowers/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToBorrowers: async (parentId: string,input: Customer): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/addToBorrowers/${parentId}/`,input);
            return response.data;
        },

        removeFromBorrowers: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/removeFromBorrowers/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getRepaymentSchedule: async (parentId: string,options?: PaginationOptions): Promise<RepaymentSchedule[]> => {
            const response = await this.http.get(`/LoanAccount/getRepaymentSchedule/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToRepaymentSchedule: async (parentId: string,input: RepaymentSchedule): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/addToRepaymentSchedule/${parentId}/`,input);
            return response.data;
        },

        removeFromRepaymentSchedule: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/removeFromRepaymentSchedule/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getPayments: async (parentId: string,options?: PaginationOptions): Promise<LoanPayment[]> => {
            const response = await this.http.get(`/LoanAccount/getPayments/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPayments: async (parentId: string,input: LoanPayment): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/addToPayments/${parentId}/`,input);
            return response.data;
        },

        removeFromPayments: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/removeFromPayments/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getCollateral: async (parentId: string,options?: PaginationOptions): Promise<Collateral[]> => {
            const response = await this.http.get(`/LoanAccount/getCollateral/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToCollateral: async (parentId: string,input: Collateral): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/addToCollateral/${parentId}/`,input);
            return response.data;
        },

        removeFromCollateral: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/removeFromCollateral/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },

        getFeeCharges: async (parentId: string,options?: PaginationOptions): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/LoanAccount/getFeeCharges/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFeeCharges: async (parentId: string,input: FeeCharge): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/addToFeeCharges/${parentId}/`,input);
            return response.data;
        },

        removeFromFeeCharges: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/removeFromFeeCharges/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getLoanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/RepaymentSchedule/getLoanAccount/${id}`);
            return response.data;
        },

        assignLoanAccount: async (id: string, loanAccountId: string): Promise<RepaymentSchedule> => {
            const response = await this.http.put(`/RepaymentSchedule/assignLoanAccount/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccount: async (id: string ): Promise<RepaymentSchedule> => {
            const response = await this.http.delete(`/RepaymentSchedule/unassignLoanAccount/${id}`);
            return response.data;
        },

        getPayment: async (id: string): Promise<LoanPayment | null> => {
            const response = await this.http.get(`/RepaymentSchedule/getPayment/${id}`);
            return response.data;
        },

        assignPayment: async (id: string, paymentId: string): Promise<RepaymentSchedule> => {
            const response = await this.http.put(`/RepaymentSchedule/assignPayment/${id}`,
                {
                    id: paymentId
                }
            );
            return response.data;
        },

        unassignPayment: async (id: string ): Promise<RepaymentSchedule> => {
            const response = await this.http.delete(`/RepaymentSchedule/unassignPayment/${id}`);
            return response.data;
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

        getLoanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/LoanPayment/getLoanAccount/${id}`);
            return response.data;
        },

        assignLoanAccount: async (id: string, loanAccountId: string): Promise<LoanPayment> => {
            const response = await this.http.put(`/LoanPayment/assignLoanAccount/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccount: async (id: string ): Promise<LoanPayment> => {
            const response = await this.http.delete(`/LoanPayment/unassignLoanAccount/${id}`);
            return response.data;
        },

        getTransaction: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/LoanPayment/getTransaction/${id}`);
            return response.data;
        },

        assignTransaction: async (id: string, transactionId: string): Promise<LoanPayment> => {
            const response = await this.http.put(`/LoanPayment/assignTransaction/${id}`,
                {
                    id: transactionId
                }
            );
            return response.data;
        },

        unassignTransaction: async (id: string ): Promise<LoanPayment> => {
            const response = await this.http.delete(`/LoanPayment/unassignTransaction/${id}`);
            return response.data;
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

        getLoanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/Collateral/getLoanAccount/${id}`);
            return response.data;
        },

        assignLoanAccount: async (id: string, loanAccountId: string): Promise<Collateral> => {
            const response = await this.http.put(`/Collateral/assignLoanAccount/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccount: async (id: string ): Promise<Collateral> => {
            const response = await this.http.delete(`/Collateral/unassignLoanAccount/${id}`);
            return response.data;
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

        getAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FeeCharge/getAccount/${id}`);
            return response.data;
        },

        assignAccount: async (id: string, accountId: string): Promise<FeeCharge> => {
            const response = await this.http.put(`/FeeCharge/assignAccount/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<FeeCharge> => {
            const response = await this.http.delete(`/FeeCharge/unassignAccount/${id}`);
            return response.data;
        },

        getLoanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/FeeCharge/getLoanAccount/${id}`);
            return response.data;
        },

        assignLoanAccount: async (id: string, loanAccountId: string): Promise<FeeCharge> => {
            const response = await this.http.put(`/FeeCharge/assignLoanAccount/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccount: async (id: string ): Promise<FeeCharge> => {
            const response = await this.http.delete(`/FeeCharge/unassignLoanAccount/${id}`);
            return response.data;
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

        getBank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/ExchangeRate/getBank/${id}`);
            return response.data;
        },

        assignBank: async (id: string, bankId: string): Promise<ExchangeRate> => {
            const response = await this.http.put(`/ExchangeRate/assignBank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<ExchangeRate> => {
            const response = await this.http.delete(`/ExchangeRate/unassignBank/${id}`);
            return response.data;
        },

        getFxTrades: async (parentId: string,options?: PaginationOptions): Promise<FXTrade[]> => {
            const response = await this.http.get(`/ExchangeRate/getFxTrades/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFxTrades: async (parentId: string,input: FXTrade): Promise<ExchangeRate> => {
            const response = await this.http.post(`/ExchangeRate/addToFxTrades/${parentId}/`,input);
            return response.data;
        },

        removeFromFxTrades: async (parentId: string,childIds: string[]): Promise<ExchangeRate> => {
            const response = await this.http.put(`/ExchangeRate/removeFromFxTrades/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getCustomer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/FXTrade/getCustomer/${id}`);
            return response.data;
        },

        assignCustomer: async (id: string, customerId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignCustomer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignCustomer/${id}`);
            return response.data;
        },

        getBank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/FXTrade/getBank/${id}`);
            return response.data;
        },

        assignBank: async (id: string, bankId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignBank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignBank/${id}`);
            return response.data;
        },

        getExchangeRate: async (id: string): Promise<ExchangeRate | null> => {
            const response = await this.http.get(`/FXTrade/getExchangeRate/${id}`);
            return response.data;
        },

        assignExchangeRate: async (id: string, exchangeRateId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignExchangeRate/${id}`,
                {
                    id: exchangeRateId
                }
            );
            return response.data;
        },

        unassignExchangeRate: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignExchangeRate/${id}`);
            return response.data;
        },

        getSourceAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FXTrade/getSourceAccount/${id}`);
            return response.data;
        },

        assignSourceAccount: async (id: string, sourceAccountId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignSourceAccount/${id}`,
                {
                    id: sourceAccountId
                }
            );
            return response.data;
        },

        unassignSourceAccount: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignSourceAccount/${id}`);
            return response.data;
        },

        getDestinationAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FXTrade/getDestinationAccount/${id}`);
            return response.data;
        },

        assignDestinationAccount: async (id: string, destinationAccountId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignDestinationAccount/${id}`,
                {
                    id: destinationAccountId
                }
            );
            return response.data;
        },

        unassignDestinationAccount: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignDestinationAccount/${id}`);
            return response.data;
        },

        getTransaction: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/FXTrade/getTransaction/${id}`);
            return response.data;
        },

        assignTransaction: async (id: string, transactionId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignTransaction/${id}`,
                {
                    id: transactionId
                }
            );
            return response.data;
        },

        unassignTransaction: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignTransaction/${id}`);
            return response.data;
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

        getTransaction: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/Dispute/getTransaction/${id}`);
            return response.data;
        },

        assignTransaction: async (id: string, transactionId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/assignTransaction/${id}`,
                {
                    id: transactionId
                }
            );
            return response.data;
        },

        unassignTransaction: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute/unassignTransaction/${id}`);
            return response.data;
        },

        getCustomer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/Dispute/getCustomer/${id}`);
            return response.data;
        },

        assignCustomer: async (id: string, customerId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/assignCustomer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute/unassignCustomer/${id}`);
            return response.data;
        },

        getAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/Dispute/getAccount/${id}`);
            return response.data;
        },

        assignAccount: async (id: string, accountId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/assignAccount/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute/unassignAccount/${id}`);
            return response.data;
        },

        getPaymentCard: async (id: string): Promise<PaymentCard | null> => {
            const response = await this.http.get(`/Dispute/getPaymentCard/${id}`);
            return response.data;
        },

        assignPaymentCard: async (id: string, paymentCardId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/assignPaymentCard/${id}`,
                {
                    id: paymentCardId
                }
            );
            return response.data;
        },

        unassignPaymentCard: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute/unassignPaymentCard/${id}`);
            return response.data;
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

        getCustomer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/Consent/getCustomer/${id}`);
            return response.data;
        },

        assignCustomer: async (id: string, customerId: string): Promise<Consent> => {
            const response = await this.http.put(`/Consent/assignCustomer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<Consent> => {
            const response = await this.http.delete(`/Consent/unassignCustomer/${id}`);
            return response.data;
        },

        getBank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Consent/getBank/${id}`);
            return response.data;
        },

        assignBank: async (id: string, bankId: string): Promise<Consent> => {
            const response = await this.http.put(`/Consent/assignBank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<Consent> => {
            const response = await this.http.delete(`/Consent/unassignBank/${id}`);
            return response.data;
        },

        getThirdPartyProvider: async (id: string): Promise<ThirdPartyProvider | null> => {
            const response = await this.http.get(`/Consent/getThirdPartyProvider/${id}`);
            return response.data;
        },

        assignThirdPartyProvider: async (id: string, thirdPartyProviderId: string): Promise<Consent> => {
            const response = await this.http.put(`/Consent/assignThirdPartyProvider/${id}`,
                {
                    id: thirdPartyProviderId
                }
            );
            return response.data;
        },

        unassignThirdPartyProvider: async (id: string ): Promise<Consent> => {
            const response = await this.http.delete(`/Consent/unassignThirdPartyProvider/${id}`);
            return response.data;
        },

        getAuthorizedAccounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Consent/getAuthorizedAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAuthorizedAccounts: async (parentId: string,input: Account): Promise<Consent> => {
            const response = await this.http.post(`/Consent/addToAuthorizedAccounts/${parentId}/`,input);
            return response.data;
        },

        removeFromAuthorizedAccounts: async (parentId: string,childIds: string[]): Promise<Consent> => {
            const response = await this.http.put(`/Consent/removeFromAuthorizedAccounts/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
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

        getBank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/ThirdPartyProvider/getBank/${id}`);
            return response.data;
        },

        assignBank: async (id: string, bankId: string): Promise<ThirdPartyProvider> => {
            const response = await this.http.put(`/ThirdPartyProvider/assignBank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<ThirdPartyProvider> => {
            const response = await this.http.delete(`/ThirdPartyProvider/unassignBank/${id}`);
            return response.data;
        },

        getConsents: async (parentId: string,options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/ThirdPartyProvider/getConsents/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,input: Consent): Promise<ThirdPartyProvider> => {
            const response = await this.http.post(`/ThirdPartyProvider/addToConsents/${parentId}/`,input);
            return response.data;
        },

        removeFromConsents: async (parentId: string,childIds: string[]): Promise<ThirdPartyProvider> => {
            const response = await this.http.put(`/ThirdPartyProvider/removeFromConsents/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },


};

}