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
            const response = await this.http.get(`/Bank/load/${id}`);
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

        update: async ( id: string, args: Bank ): Promise<Bank> => {
            const response = await this.http.put(`/Bank/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Bank/delete/${id}`);
            return true;
        },



        branches: async (parentId: string,options?: PaginationOptions): Promise<Branch[]> => {
            const response = await this.http.get(`/Bank/branches/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToBranches: async (parentId: string,input: Branch): Promise<Bank> => {
            const response = await this.http.post(`/Bank/branches/${parentId}/`,input);
            return response.data;
        },

        assignToBranches: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/branches/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        products: async (parentId: string,options?: PaginationOptions): Promise<BankingProduct[]> => {
            const response = await this.http.get(`/Bank/products/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToProducts: async (parentId: string,input: BankingProduct): Promise<Bank> => {
            const response = await this.http.post(`/Bank/products/${parentId}/`,input);
            return response.data;
        },

        assignToProducts: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/products/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        customers: async (parentId: string,options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/Bank/customers/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToCustomers: async (parentId: string,input: Customer): Promise<Bank> => {
            const response = await this.http.post(`/Bank/customers/${parentId}/`,input);
            return response.data;
        },

        assignToCustomers: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/customers/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        accounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Bank/accounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,input: Account): Promise<Bank> => {
            const response = await this.http.post(`/Bank/accounts/${parentId}/`,input);
            return response.data;
        },

        assignToAccounts: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/accounts/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        paymentCards: async (parentId: string,options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/Bank/paymentCards/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,input: PaymentCard): Promise<Bank> => {
            const response = await this.http.post(`/Bank/paymentCards/${parentId}/`,input);
            return response.data;
        },

        assignToPaymentCards: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/paymentCards/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        loanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Bank/loanAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,input: LoanAccount): Promise<Bank> => {
            const response = await this.http.post(`/Bank/loanAccounts/${parentId}/`,input);
            return response.data;
        },

        assignToLoanAccounts: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/loanAccounts/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        exchangeRates: async (parentId: string,options?: PaginationOptions): Promise<ExchangeRate[]> => {
            const response = await this.http.get(`/Bank/exchangeRates/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToExchangeRates: async (parentId: string,input: ExchangeRate): Promise<Bank> => {
            const response = await this.http.post(`/Bank/exchangeRates/${parentId}/`,input);
            return response.data;
        },

        assignToExchangeRates: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/exchangeRates/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        consents: async (parentId: string,options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/Bank/consents/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,input: Consent): Promise<Bank> => {
            const response = await this.http.post(`/Bank/consents/${parentId}/`,input);
            return response.data;
        },

        assignToConsents: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/consents/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        thirdPartyProviders: async (parentId: string,options?: PaginationOptions): Promise<ThirdPartyProvider[]> => {
            const response = await this.http.get(`/Bank/thirdPartyProviders/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToThirdPartyProviders: async (parentId: string,input: ThirdPartyProvider): Promise<Bank> => {
            const response = await this.http.post(`/Bank/thirdPartyProviders/${parentId}/`,input);
            return response.data;
        },

        assignToThirdPartyProviders: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/thirdPartyProviders/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    branch = {
        find: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/Branch/load/${id}`);
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

        update: async ( id: string, args: Branch ): Promise<Branch> => {
            const response = await this.http.put(`/Branch/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Branch/delete/${id}`);
            return true;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Branch/bank/${id}`);
            return response.data;
        },

        assignToBank: async (id: string, bankId: string): Promise<Branch> => {
            const response = await this.http.put(`/Branch/bank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<Branch> => {
            const response = await this.http.delete(`/Branch//bank/${id}`);
            return response.data;
        },



        accounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Branch/accounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,input: Account): Promise<Branch> => {
            const response = await this.http.post(`/Branch/accounts/${parentId}/`,input);
            return response.data;
        },

        assignToAccounts: async (parentId: string,childIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/accounts/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        loanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Branch/loanAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,input: LoanAccount): Promise<Branch> => {
            const response = await this.http.post(`/Branch/loanAccounts/${parentId}/`,input);
            return response.data;
        },

        assignToLoanAccounts: async (parentId: string,childIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/loanAccounts/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        atms: async (parentId: string,options?: PaginationOptions): Promise<ATM[]> => {
            const response = await this.http.get(`/Branch/atms/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAtms: async (parentId: string,input: ATM): Promise<Branch> => {
            const response = await this.http.post(`/Branch/atms/${parentId}/`,input);
            return response.data;
        },

        assignToAtms: async (parentId: string,childIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/atms/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    aTM = {
        find: async (id: string): Promise<ATM | null> => {
            const response = await this.http.get(`/ATM/load/${id}`);
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

        update: async ( id: string, args: ATM ): Promise<ATM> => {
            const response = await this.http.put(`/ATM/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ATM/delete/${id}`);
            return true;
        },


        branch: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/ATM/branch/${id}`);
            return response.data;
        },

        assignToBranch: async (id: string, branchId: string): Promise<ATM> => {
            const response = await this.http.put(`/ATM/branch/${id}`,
                {
                    id: branchId
                }
            );
            return response.data;
        },

        unassignBranch: async (id: string ): Promise<ATM> => {
            const response = await this.http.delete(`/ATM//branch/${id}`);
            return response.data;
        },



};


    customer = {
        find: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/Customer/load/${id}`);
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

        update: async ( id: string, args: Customer ): Promise<Customer> => {
            const response = await this.http.put(`/Customer/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Customer/delete/${id}`);
            return true;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Customer/bank/${id}`);
            return response.data;
        },

        assignToBank: async (id: string, bankId: string): Promise<Customer> => {
            const response = await this.http.put(`/Customer/bank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<Customer> => {
            const response = await this.http.delete(`/Customer//bank/${id}`);
            return response.data;
        },



        accounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Customer/accounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,input: Account): Promise<Customer> => {
            const response = await this.http.post(`/Customer/accounts/${parentId}/`,input);
            return response.data;
        },

        assignToAccounts: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/accounts/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        loanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Customer/loanAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,input: LoanAccount): Promise<Customer> => {
            const response = await this.http.post(`/Customer/loanAccounts/${parentId}/`,input);
            return response.data;
        },

        assignToLoanAccounts: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/loanAccounts/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        paymentCards: async (parentId: string,options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/Customer/paymentCards/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,input: PaymentCard): Promise<Customer> => {
            const response = await this.http.post(`/Customer/paymentCards/${parentId}/`,input);
            return response.data;
        },

        assignToPaymentCards: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/paymentCards/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        externalAccounts: async (parentId: string,options?: PaginationOptions): Promise<ExternalAccount[]> => {
            const response = await this.http.get(`/Customer/externalAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToExternalAccounts: async (parentId: string,input: ExternalAccount): Promise<Customer> => {
            const response = await this.http.post(`/Customer/externalAccounts/${parentId}/`,input);
            return response.data;
        },

        assignToExternalAccounts: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/externalAccounts/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        fundsTransfers: async (parentId: string,options?: PaginationOptions): Promise<FundsTransfer[]> => {
            const response = await this.http.get(`/Customer/fundsTransfers/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFundsTransfers: async (parentId: string,input: FundsTransfer): Promise<Customer> => {
            const response = await this.http.post(`/Customer/fundsTransfers/${parentId}/`,input);
            return response.data;
        },

        assignToFundsTransfers: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/fundsTransfers/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        disputes: async (parentId: string,options?: PaginationOptions): Promise<Dispute[]> => {
            const response = await this.http.get(`/Customer/disputes/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToDisputes: async (parentId: string,input: Dispute): Promise<Customer> => {
            const response = await this.http.post(`/Customer/disputes/${parentId}/`,input);
            return response.data;
        },

        assignToDisputes: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/disputes/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        kycProfiles: async (parentId: string,options?: PaginationOptions): Promise<KycProfile[]> => {
            const response = await this.http.get(`/Customer/kycProfiles/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToKycProfiles: async (parentId: string,input: KycProfile): Promise<Customer> => {
            const response = await this.http.post(`/Customer/kycProfiles/${parentId}/`,input);
            return response.data;
        },

        assignToKycProfiles: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/kycProfiles/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        consents: async (parentId: string,options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/Customer/consents/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,input: Consent): Promise<Customer> => {
            const response = await this.http.post(`/Customer/consents/${parentId}/`,input);
            return response.data;
        },

        assignToConsents: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/consents/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    kycProfile = {
        find: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/KycProfile/load/${id}`);
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

        update: async ( id: string, args: KycProfile ): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/KycProfile/delete/${id}`);
            return true;
        },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/KycProfile/customer/${id}`);
            return response.data;
        },

        assignToCustomer: async (id: string, customerId: string): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/customer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<KycProfile> => {
            const response = await this.http.delete(`/KycProfile//customer/${id}`);
            return response.data;
        },



        identityDocuments: async (parentId: string,options?: PaginationOptions): Promise<IdentityDocument[]> => {
            const response = await this.http.get(`/KycProfile/identityDocuments/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToIdentityDocuments: async (parentId: string,input: IdentityDocument): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/identityDocuments/${parentId}/`,input);
            return response.data;
        },

        assignToIdentityDocuments: async (parentId: string,childIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/identityDocuments/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        riskAssessments: async (parentId: string,options?: PaginationOptions): Promise<RiskAssessment[]> => {
            const response = await this.http.get(`/KycProfile/riskAssessments/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToRiskAssessments: async (parentId: string,input: RiskAssessment): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/riskAssessments/${parentId}/`,input);
            return response.data;
        },

        assignToRiskAssessments: async (parentId: string,childIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/riskAssessments/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        screenings: async (parentId: string,options?: PaginationOptions): Promise<ScreeningResult[]> => {
            const response = await this.http.get(`/KycProfile/screenings/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToScreenings: async (parentId: string,input: ScreeningResult): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/screenings/${parentId}/`,input);
            return response.data;
        },

        assignToScreenings: async (parentId: string,childIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/screenings/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    identityDocument = {
        find: async (id: string): Promise<IdentityDocument | null> => {
            const response = await this.http.get(`/IdentityDocument/load/${id}`);
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

        update: async ( id: string, args: IdentityDocument ): Promise<IdentityDocument> => {
            const response = await this.http.put(`/IdentityDocument/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/IdentityDocument/delete/${id}`);
            return true;
        },


        kycProfile: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/IdentityDocument/kycProfile/${id}`);
            return response.data;
        },

        assignToKycProfile: async (id: string, kycProfileId: string): Promise<IdentityDocument> => {
            const response = await this.http.put(`/IdentityDocument/kycProfile/${id}`,
                {
                    id: kycProfileId
                }
            );
            return response.data;
        },

        unassignKycProfile: async (id: string ): Promise<IdentityDocument> => {
            const response = await this.http.delete(`/IdentityDocument//kycProfile/${id}`);
            return response.data;
        },



};


    riskAssessment = {
        find: async (id: string): Promise<RiskAssessment | null> => {
            const response = await this.http.get(`/RiskAssessment/load/${id}`);
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

        update: async ( id: string, args: RiskAssessment ): Promise<RiskAssessment> => {
            const response = await this.http.put(`/RiskAssessment/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/RiskAssessment/delete/${id}`);
            return true;
        },


        kycProfile: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/RiskAssessment/kycProfile/${id}`);
            return response.data;
        },

        assignToKycProfile: async (id: string, kycProfileId: string): Promise<RiskAssessment> => {
            const response = await this.http.put(`/RiskAssessment/kycProfile/${id}`,
                {
                    id: kycProfileId
                }
            );
            return response.data;
        },

        unassignKycProfile: async (id: string ): Promise<RiskAssessment> => {
            const response = await this.http.delete(`/RiskAssessment//kycProfile/${id}`);
            return response.data;
        },



};


    screeningResult = {
        find: async (id: string): Promise<ScreeningResult | null> => {
            const response = await this.http.get(`/ScreeningResult/load/${id}`);
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

        update: async ( id: string, args: ScreeningResult ): Promise<ScreeningResult> => {
            const response = await this.http.put(`/ScreeningResult/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ScreeningResult/delete/${id}`);
            return true;
        },


        kycProfile: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/ScreeningResult/kycProfile/${id}`);
            return response.data;
        },

        assignToKycProfile: async (id: string, kycProfileId: string): Promise<ScreeningResult> => {
            const response = await this.http.put(`/ScreeningResult/kycProfile/${id}`,
                {
                    id: kycProfileId
                }
            );
            return response.data;
        },

        unassignKycProfile: async (id: string ): Promise<ScreeningResult> => {
            const response = await this.http.delete(`/ScreeningResult//kycProfile/${id}`);
            return response.data;
        },



};


    bankingProduct = {
        find: async (id: string): Promise<BankingProduct | null> => {
            const response = await this.http.get(`/BankingProduct/load/${id}`);
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

        update: async ( id: string, args: BankingProduct ): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/BankingProduct/delete/${id}`);
            return true;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/BankingProduct/bank/${id}`);
            return response.data;
        },

        assignToBank: async (id: string, bankId: string): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/bank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<BankingProduct> => {
            const response = await this.http.delete(`/BankingProduct//bank/${id}`);
            return response.data;
        },



        accounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/BankingProduct/accounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (parentId: string,input: Account): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/accounts/${parentId}/`,input);
            return response.data;
        },

        assignToAccounts: async (parentId: string,childIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/accounts/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        loanAccounts: async (parentId: string,options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/BankingProduct/loanAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (parentId: string,input: LoanAccount): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/loanAccounts/${parentId}/`,input);
            return response.data;
        },

        assignToLoanAccounts: async (parentId: string,childIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/loanAccounts/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        paymentCards: async (parentId: string,options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/BankingProduct/paymentCards/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (parentId: string,input: PaymentCard): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/paymentCards/${parentId}/`,input);
            return response.data;
        },

        assignToPaymentCards: async (parentId: string,childIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/paymentCards/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    account = {
        find: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/Account/load/${id}`);
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

        update: async ( id: string, args: Account ): Promise<Account> => {
            const response = await this.http.put(`/Account/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Account/delete/${id}`);
            return true;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Account/bank/${id}`);
            return response.data;
        },

        assignToBank: async (id: string, bankId: string): Promise<Account> => {
            const response = await this.http.put(`/Account/bank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<Account> => {
            const response = await this.http.delete(`/Account//bank/${id}`);
            return response.data;
        },


        branch: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/Account/branch/${id}`);
            return response.data;
        },

        assignToBranch: async (id: string, branchId: string): Promise<Account> => {
            const response = await this.http.put(`/Account/branch/${id}`,
                {
                    id: branchId
                }
            );
            return response.data;
        },

        unassignBranch: async (id: string ): Promise<Account> => {
            const response = await this.http.delete(`/Account//branch/${id}`);
            return response.data;
        },


        product: async (id: string): Promise<BankingProduct | null> => {
            const response = await this.http.get(`/Account/product/${id}`);
            return response.data;
        },

        assignToProduct: async (id: string, productId: string): Promise<Account> => {
            const response = await this.http.put(`/Account/product/${id}`,
                {
                    id: productId
                }
            );
            return response.data;
        },

        unassignProduct: async (id: string ): Promise<Account> => {
            const response = await this.http.delete(`/Account//product/${id}`);
            return response.data;
        },



        owners: async (parentId: string,options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/Account/owners/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToOwners: async (parentId: string,input: Customer): Promise<Account> => {
            const response = await this.http.post(`/Account/owners/${parentId}/`,input);
            return response.data;
        },

        assignToOwners: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/owners/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        transactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/Account/transactions/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,input: Transaction): Promise<Account> => {
            const response = await this.http.post(`/Account/transactions/${parentId}/`,input);
            return response.data;
        },

        assignToTransactions: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/transactions/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        statements: async (parentId: string,options?: PaginationOptions): Promise<AccountStatement[]> => {
            const response = await this.http.get(`/Account/statements/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToStatements: async (parentId: string,input: AccountStatement): Promise<Account> => {
            const response = await this.http.post(`/Account/statements/${parentId}/`,input);
            return response.data;
        },

        assignToStatements: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/statements/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        standingInstructions: async (parentId: string,options?: PaginationOptions): Promise<StandingInstruction[]> => {
            const response = await this.http.get(`/Account/standingInstructions/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToStandingInstructions: async (parentId: string,input: StandingInstruction): Promise<Account> => {
            const response = await this.http.post(`/Account/standingInstructions/${parentId}/`,input);
            return response.data;
        },

        assignToStandingInstructions: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/standingInstructions/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        feeCharges: async (parentId: string,options?: PaginationOptions): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/Account/feeCharges/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFeeCharges: async (parentId: string,input: FeeCharge): Promise<Account> => {
            const response = await this.http.post(`/Account/feeCharges/${parentId}/`,input);
            return response.data;
        },

        assignToFeeCharges: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/feeCharges/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    accountStatement = {
        find: async (id: string): Promise<AccountStatement | null> => {
            const response = await this.http.get(`/AccountStatement/load/${id}`);
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

        update: async ( id: string, args: AccountStatement ): Promise<AccountStatement> => {
            const response = await this.http.put(`/AccountStatement/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/AccountStatement/delete/${id}`);
            return true;
        },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/AccountStatement/account/${id}`);
            return response.data;
        },

        assignToAccount: async (id: string, accountId: string): Promise<AccountStatement> => {
            const response = await this.http.put(`/AccountStatement/account/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<AccountStatement> => {
            const response = await this.http.delete(`/AccountStatement//account/${id}`);
            return response.data;
        },



};


    transaction = {
        find: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/Transaction/load/${id}`);
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

        update: async ( id: string, args: Transaction ): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Transaction/delete/${id}`);
            return true;
        },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/Transaction/account/${id}`);
            return response.data;
        },

        assignToAccount: async (id: string, accountId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/account/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction//account/${id}`);
            return response.data;
        },


        externalCounterparty: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/Transaction/externalCounterparty/${id}`);
            return response.data;
        },

        assignToExternalCounterparty: async (id: string, externalCounterpartyId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/externalCounterparty/${id}`,
                {
                    id: externalCounterpartyId
                }
            );
            return response.data;
        },

        unassignExternalCounterparty: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction//externalCounterparty/${id}`);
            return response.data;
        },


        paymentCard: async (id: string): Promise<PaymentCard | null> => {
            const response = await this.http.get(`/Transaction/paymentCard/${id}`);
            return response.data;
        },

        assignToPaymentCard: async (id: string, paymentCardId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/paymentCard/${id}`,
                {
                    id: paymentCardId
                }
            );
            return response.data;
        },

        unassignPaymentCard: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction//paymentCard/${id}`);
            return response.data;
        },


        fundsTransfer: async (id: string): Promise<FundsTransfer | null> => {
            const response = await this.http.get(`/Transaction/fundsTransfer/${id}`);
            return response.data;
        },

        assignToFundsTransfer: async (id: string, fundsTransferId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/fundsTransfer/${id}`,
                {
                    id: fundsTransferId
                }
            );
            return response.data;
        },

        unassignFundsTransfer: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction//fundsTransfer/${id}`);
            return response.data;
        },


        fxTrade: async (id: string): Promise<FXTrade | null> => {
            const response = await this.http.get(`/Transaction/fxTrade/${id}`);
            return response.data;
        },

        assignToFxTrade: async (id: string, fxTradeId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/fxTrade/${id}`,
                {
                    id: fxTradeId
                }
            );
            return response.data;
        },

        unassignFxTrade: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction//fxTrade/${id}`);
            return response.data;
        },


        dispute: async (id: string): Promise<Dispute | null> => {
            const response = await this.http.get(`/Transaction/dispute/${id}`);
            return response.data;
        },

        assignToDispute: async (id: string, disputeId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/dispute/${id}`,
                {
                    id: disputeId
                }
            );
            return response.data;
        },

        unassignDispute: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction//dispute/${id}`);
            return response.data;
        },



};


    externalAccount = {
        find: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/ExternalAccount/load/${id}`);
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

        update: async ( id: string, args: ExternalAccount ): Promise<ExternalAccount> => {
            const response = await this.http.put(`/ExternalAccount/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ExternalAccount/delete/${id}`);
            return true;
        },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/ExternalAccount/customer/${id}`);
            return response.data;
        },

        assignToCustomer: async (id: string, customerId: string): Promise<ExternalAccount> => {
            const response = await this.http.put(`/ExternalAccount/customer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<ExternalAccount> => {
            const response = await this.http.delete(`/ExternalAccount//customer/${id}`);
            return response.data;
        },



        transactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/ExternalAccount/transactions/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,input: Transaction): Promise<ExternalAccount> => {
            const response = await this.http.post(`/ExternalAccount/transactions/${parentId}/`,input);
            return response.data;
        },

        assignToTransactions: async (parentId: string,childIds: string[]): Promise<ExternalAccount> => {
            const response = await this.http.put(`/ExternalAccount/transactions/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    fundsTransfer = {
        find: async (id: string): Promise<FundsTransfer | null> => {
            const response = await this.http.get(`/FundsTransfer/load/${id}`);
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

        update: async ( id: string, args: FundsTransfer ): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/FundsTransfer/delete/${id}`);
            return true;
        },


        sourceAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FundsTransfer/sourceAccount/${id}`);
            return response.data;
        },

        assignToSourceAccount: async (id: string, sourceAccountId: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/sourceAccount/${id}`,
                {
                    id: sourceAccountId
                }
            );
            return response.data;
        },

        unassignSourceAccount: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer//sourceAccount/${id}`);
            return response.data;
        },


        destinationAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FundsTransfer/destinationAccount/${id}`);
            return response.data;
        },

        assignToDestinationAccount: async (id: string, destinationAccountId: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/destinationAccount/${id}`,
                {
                    id: destinationAccountId
                }
            );
            return response.data;
        },

        unassignDestinationAccount: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer//destinationAccount/${id}`);
            return response.data;
        },


        externalBeneficiary: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/FundsTransfer/externalBeneficiary/${id}`);
            return response.data;
        },

        assignToExternalBeneficiary: async (id: string, externalBeneficiaryId: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/externalBeneficiary/${id}`,
                {
                    id: externalBeneficiaryId
                }
            );
            return response.data;
        },

        unassignExternalBeneficiary: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer//externalBeneficiary/${id}`);
            return response.data;
        },


        initiatedBy: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/FundsTransfer/initiatedBy/${id}`);
            return response.data;
        },

        assignToInitiatedBy: async (id: string, initiatedById: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/initiatedBy/${id}`,
                {
                    id: initiatedById
                }
            );
            return response.data;
        },

        unassignInitiatedBy: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer//initiatedBy/${id}`);
            return response.data;
        },



        transactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/FundsTransfer/transactions/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,input: Transaction): Promise<FundsTransfer> => {
            const response = await this.http.post(`/FundsTransfer/transactions/${parentId}/`,input);
            return response.data;
        },

        assignToTransactions: async (parentId: string,childIds: string[]): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/transactions/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    standingInstruction = {
        find: async (id: string): Promise<StandingInstruction | null> => {
            const response = await this.http.get(`/StandingInstruction/load/${id}`);
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

        update: async ( id: string, args: StandingInstruction ): Promise<StandingInstruction> => {
            const response = await this.http.put(`/StandingInstruction/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/StandingInstruction/delete/${id}`);
            return true;
        },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/StandingInstruction/account/${id}`);
            return response.data;
        },

        assignToAccount: async (id: string, accountId: string): Promise<StandingInstruction> => {
            const response = await this.http.put(`/StandingInstruction/account/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<StandingInstruction> => {
            const response = await this.http.delete(`/StandingInstruction//account/${id}`);
            return response.data;
        },


        beneficiary: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/StandingInstruction/beneficiary/${id}`);
            return response.data;
        },

        assignToBeneficiary: async (id: string, beneficiaryId: string): Promise<StandingInstruction> => {
            const response = await this.http.put(`/StandingInstruction/beneficiary/${id}`,
                {
                    id: beneficiaryId
                }
            );
            return response.data;
        },

        unassignBeneficiary: async (id: string ): Promise<StandingInstruction> => {
            const response = await this.http.delete(`/StandingInstruction//beneficiary/${id}`);
            return response.data;
        },



};


    paymentCard = {
        find: async (id: string): Promise<PaymentCard | null> => {
            const response = await this.http.get(`/PaymentCard/load/${id}`);
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

        update: async ( id: string, args: PaymentCard ): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/PaymentCard/delete/${id}`);
            return true;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/PaymentCard/bank/${id}`);
            return response.data;
        },

        assignToBank: async (id: string, bankId: string): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/bank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<PaymentCard> => {
            const response = await this.http.delete(`/PaymentCard//bank/${id}`);
            return response.data;
        },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/PaymentCard/account/${id}`);
            return response.data;
        },

        assignToAccount: async (id: string, accountId: string): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/account/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<PaymentCard> => {
            const response = await this.http.delete(`/PaymentCard//account/${id}`);
            return response.data;
        },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/PaymentCard/customer/${id}`);
            return response.data;
        },

        assignToCustomer: async (id: string, customerId: string): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/customer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<PaymentCard> => {
            const response = await this.http.delete(`/PaymentCard//customer/${id}`);
            return response.data;
        },



        transactions: async (parentId: string,options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/PaymentCard/transactions/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (parentId: string,input: Transaction): Promise<PaymentCard> => {
            const response = await this.http.post(`/PaymentCard/transactions/${parentId}/`,input);
            return response.data;
        },

        assignToTransactions: async (parentId: string,childIds: string[]): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/transactions/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    loanAccount = {
        find: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/LoanAccount/load/${id}`);
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

        update: async ( id: string, args: LoanAccount ): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/LoanAccount/delete/${id}`);
            return true;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/LoanAccount/bank/${id}`);
            return response.data;
        },

        assignToBank: async (id: string, bankId: string): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/bank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<LoanAccount> => {
            const response = await this.http.delete(`/LoanAccount//bank/${id}`);
            return response.data;
        },


        branch: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/LoanAccount/branch/${id}`);
            return response.data;
        },

        assignToBranch: async (id: string, branchId: string): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/branch/${id}`,
                {
                    id: branchId
                }
            );
            return response.data;
        },

        unassignBranch: async (id: string ): Promise<LoanAccount> => {
            const response = await this.http.delete(`/LoanAccount//branch/${id}`);
            return response.data;
        },


        product: async (id: string): Promise<BankingProduct | null> => {
            const response = await this.http.get(`/LoanAccount/product/${id}`);
            return response.data;
        },

        assignToProduct: async (id: string, productId: string): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/product/${id}`,
                {
                    id: productId
                }
            );
            return response.data;
        },

        unassignProduct: async (id: string ): Promise<LoanAccount> => {
            const response = await this.http.delete(`/LoanAccount//product/${id}`);
            return response.data;
        },



        borrowers: async (parentId: string,options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/LoanAccount/borrowers/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToBorrowers: async (parentId: string,input: Customer): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/borrowers/${parentId}/`,input);
            return response.data;
        },

        assignToBorrowers: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/borrowers/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        repaymentSchedule: async (parentId: string,options?: PaginationOptions): Promise<RepaymentSchedule[]> => {
            const response = await this.http.get(`/LoanAccount/repaymentSchedule/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToRepaymentSchedule: async (parentId: string,input: RepaymentSchedule): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/repaymentSchedule/${parentId}/`,input);
            return response.data;
        },

        assignToRepaymentSchedule: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/repaymentSchedule/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        payments: async (parentId: string,options?: PaginationOptions): Promise<LoanPayment[]> => {
            const response = await this.http.get(`/LoanAccount/payments/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPayments: async (parentId: string,input: LoanPayment): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/payments/${parentId}/`,input);
            return response.data;
        },

        assignToPayments: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/payments/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        collateral: async (parentId: string,options?: PaginationOptions): Promise<Collateral[]> => {
            const response = await this.http.get(`/LoanAccount/collateral/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToCollateral: async (parentId: string,input: Collateral): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/collateral/${parentId}/`,input);
            return response.data;
        },

        assignToCollateral: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/collateral/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


        feeCharges: async (parentId: string,options?: PaginationOptions): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/LoanAccount/feeCharges/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFeeCharges: async (parentId: string,input: FeeCharge): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/feeCharges/${parentId}/`,input);
            return response.data;
        },

        assignToFeeCharges: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/feeCharges/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    repaymentSchedule = {
        find: async (id: string): Promise<RepaymentSchedule | null> => {
            const response = await this.http.get(`/RepaymentSchedule/load/${id}`);
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

        update: async ( id: string, args: RepaymentSchedule ): Promise<RepaymentSchedule> => {
            const response = await this.http.put(`/RepaymentSchedule/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/RepaymentSchedule/delete/${id}`);
            return true;
        },


        loanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/RepaymentSchedule/loanAccount/${id}`);
            return response.data;
        },

        assignToLoanAccount: async (id: string, loanAccountId: string): Promise<RepaymentSchedule> => {
            const response = await this.http.put(`/RepaymentSchedule/loanAccount/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccount: async (id: string ): Promise<RepaymentSchedule> => {
            const response = await this.http.delete(`/RepaymentSchedule//loanAccount/${id}`);
            return response.data;
        },


        payment: async (id: string): Promise<LoanPayment | null> => {
            const response = await this.http.get(`/RepaymentSchedule/payment/${id}`);
            return response.data;
        },

        assignToPayment: async (id: string, paymentId: string): Promise<RepaymentSchedule> => {
            const response = await this.http.put(`/RepaymentSchedule/payment/${id}`,
                {
                    id: paymentId
                }
            );
            return response.data;
        },

        unassignPayment: async (id: string ): Promise<RepaymentSchedule> => {
            const response = await this.http.delete(`/RepaymentSchedule//payment/${id}`);
            return response.data;
        },



};


    loanPayment = {
        find: async (id: string): Promise<LoanPayment | null> => {
            const response = await this.http.get(`/LoanPayment/load/${id}`);
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

        update: async ( id: string, args: LoanPayment ): Promise<LoanPayment> => {
            const response = await this.http.put(`/LoanPayment/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/LoanPayment/delete/${id}`);
            return true;
        },


        loanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/LoanPayment/loanAccount/${id}`);
            return response.data;
        },

        assignToLoanAccount: async (id: string, loanAccountId: string): Promise<LoanPayment> => {
            const response = await this.http.put(`/LoanPayment/loanAccount/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccount: async (id: string ): Promise<LoanPayment> => {
            const response = await this.http.delete(`/LoanPayment//loanAccount/${id}`);
            return response.data;
        },


        transaction: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/LoanPayment/transaction/${id}`);
            return response.data;
        },

        assignToTransaction: async (id: string, transactionId: string): Promise<LoanPayment> => {
            const response = await this.http.put(`/LoanPayment/transaction/${id}`,
                {
                    id: transactionId
                }
            );
            return response.data;
        },

        unassignTransaction: async (id: string ): Promise<LoanPayment> => {
            const response = await this.http.delete(`/LoanPayment//transaction/${id}`);
            return response.data;
        },



};


    collateral = {
        find: async (id: string): Promise<Collateral | null> => {
            const response = await this.http.get(`/Collateral/load/${id}`);
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

        update: async ( id: string, args: Collateral ): Promise<Collateral> => {
            const response = await this.http.put(`/Collateral/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Collateral/delete/${id}`);
            return true;
        },


        loanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/Collateral/loanAccount/${id}`);
            return response.data;
        },

        assignToLoanAccount: async (id: string, loanAccountId: string): Promise<Collateral> => {
            const response = await this.http.put(`/Collateral/loanAccount/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccount: async (id: string ): Promise<Collateral> => {
            const response = await this.http.delete(`/Collateral//loanAccount/${id}`);
            return response.data;
        },



};


    feeCharge = {
        find: async (id: string): Promise<FeeCharge | null> => {
            const response = await this.http.get(`/FeeCharge/load/${id}`);
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

        update: async ( id: string, args: FeeCharge ): Promise<FeeCharge> => {
            const response = await this.http.put(`/FeeCharge/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/FeeCharge/delete/${id}`);
            return true;
        },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FeeCharge/account/${id}`);
            return response.data;
        },

        assignToAccount: async (id: string, accountId: string): Promise<FeeCharge> => {
            const response = await this.http.put(`/FeeCharge/account/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<FeeCharge> => {
            const response = await this.http.delete(`/FeeCharge//account/${id}`);
            return response.data;
        },


        loanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/FeeCharge/loanAccount/${id}`);
            return response.data;
        },

        assignToLoanAccount: async (id: string, loanAccountId: string): Promise<FeeCharge> => {
            const response = await this.http.put(`/FeeCharge/loanAccount/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccount: async (id: string ): Promise<FeeCharge> => {
            const response = await this.http.delete(`/FeeCharge//loanAccount/${id}`);
            return response.data;
        },



};


    exchangeRate = {
        find: async (id: string): Promise<ExchangeRate | null> => {
            const response = await this.http.get(`/ExchangeRate/load/${id}`);
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

        update: async ( id: string, args: ExchangeRate ): Promise<ExchangeRate> => {
            const response = await this.http.put(`/ExchangeRate/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ExchangeRate/delete/${id}`);
            return true;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/ExchangeRate/bank/${id}`);
            return response.data;
        },

        assignToBank: async (id: string, bankId: string): Promise<ExchangeRate> => {
            const response = await this.http.put(`/ExchangeRate/bank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<ExchangeRate> => {
            const response = await this.http.delete(`/ExchangeRate//bank/${id}`);
            return response.data;
        },



        fxTrades: async (parentId: string,options?: PaginationOptions): Promise<FXTrade[]> => {
            const response = await this.http.get(`/ExchangeRate/fxTrades/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFxTrades: async (parentId: string,input: FXTrade): Promise<ExchangeRate> => {
            const response = await this.http.post(`/ExchangeRate/fxTrades/${parentId}/`,input);
            return response.data;
        },

        assignToFxTrades: async (parentId: string,childIds: string[]): Promise<ExchangeRate> => {
            const response = await this.http.put(`/ExchangeRate/fxTrades/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    fXTrade = {
        find: async (id: string): Promise<FXTrade | null> => {
            const response = await this.http.get(`/FXTrade/load/${id}`);
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

        update: async ( id: string, args: FXTrade ): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/FXTrade/delete/${id}`);
            return true;
        },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/FXTrade/customer/${id}`);
            return response.data;
        },

        assignToCustomer: async (id: string, customerId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/customer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade//customer/${id}`);
            return response.data;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/FXTrade/bank/${id}`);
            return response.data;
        },

        assignToBank: async (id: string, bankId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/bank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade//bank/${id}`);
            return response.data;
        },


        exchangeRate: async (id: string): Promise<ExchangeRate | null> => {
            const response = await this.http.get(`/FXTrade/exchangeRate/${id}`);
            return response.data;
        },

        assignToExchangeRate: async (id: string, exchangeRateId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/exchangeRate/${id}`,
                {
                    id: exchangeRateId
                }
            );
            return response.data;
        },

        unassignExchangeRate: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade//exchangeRate/${id}`);
            return response.data;
        },


        sourceAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FXTrade/sourceAccount/${id}`);
            return response.data;
        },

        assignToSourceAccount: async (id: string, sourceAccountId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/sourceAccount/${id}`,
                {
                    id: sourceAccountId
                }
            );
            return response.data;
        },

        unassignSourceAccount: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade//sourceAccount/${id}`);
            return response.data;
        },


        destinationAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FXTrade/destinationAccount/${id}`);
            return response.data;
        },

        assignToDestinationAccount: async (id: string, destinationAccountId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/destinationAccount/${id}`,
                {
                    id: destinationAccountId
                }
            );
            return response.data;
        },

        unassignDestinationAccount: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade//destinationAccount/${id}`);
            return response.data;
        },


        transaction: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/FXTrade/transaction/${id}`);
            return response.data;
        },

        assignToTransaction: async (id: string, transactionId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/transaction/${id}`,
                {
                    id: transactionId
                }
            );
            return response.data;
        },

        unassignTransaction: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade//transaction/${id}`);
            return response.data;
        },



};


    dispute = {
        find: async (id: string): Promise<Dispute | null> => {
            const response = await this.http.get(`/Dispute/load/${id}`);
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

        update: async ( id: string, args: Dispute ): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Dispute/delete/${id}`);
            return true;
        },


        transaction: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/Dispute/transaction/${id}`);
            return response.data;
        },

        assignToTransaction: async (id: string, transactionId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/transaction/${id}`,
                {
                    id: transactionId
                }
            );
            return response.data;
        },

        unassignTransaction: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute//transaction/${id}`);
            return response.data;
        },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/Dispute/customer/${id}`);
            return response.data;
        },

        assignToCustomer: async (id: string, customerId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/customer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute//customer/${id}`);
            return response.data;
        },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/Dispute/account/${id}`);
            return response.data;
        },

        assignToAccount: async (id: string, accountId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/account/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccount: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute//account/${id}`);
            return response.data;
        },


        paymentCard: async (id: string): Promise<PaymentCard | null> => {
            const response = await this.http.get(`/Dispute/paymentCard/${id}`);
            return response.data;
        },

        assignToPaymentCard: async (id: string, paymentCardId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/paymentCard/${id}`,
                {
                    id: paymentCardId
                }
            );
            return response.data;
        },

        unassignPaymentCard: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute//paymentCard/${id}`);
            return response.data;
        },



};


    consent = {
        find: async (id: string): Promise<Consent | null> => {
            const response = await this.http.get(`/Consent/load/${id}`);
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

        update: async ( id: string, args: Consent ): Promise<Consent> => {
            const response = await this.http.put(`/Consent/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Consent/delete/${id}`);
            return true;
        },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/Consent/customer/${id}`);
            return response.data;
        },

        assignToCustomer: async (id: string, customerId: string): Promise<Consent> => {
            const response = await this.http.put(`/Consent/customer/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomer: async (id: string ): Promise<Consent> => {
            const response = await this.http.delete(`/Consent//customer/${id}`);
            return response.data;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Consent/bank/${id}`);
            return response.data;
        },

        assignToBank: async (id: string, bankId: string): Promise<Consent> => {
            const response = await this.http.put(`/Consent/bank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<Consent> => {
            const response = await this.http.delete(`/Consent//bank/${id}`);
            return response.data;
        },


        thirdPartyProvider: async (id: string): Promise<ThirdPartyProvider | null> => {
            const response = await this.http.get(`/Consent/thirdPartyProvider/${id}`);
            return response.data;
        },

        assignToThirdPartyProvider: async (id: string, thirdPartyProviderId: string): Promise<Consent> => {
            const response = await this.http.put(`/Consent/thirdPartyProvider/${id}`,
                {
                    id: thirdPartyProviderId
                }
            );
            return response.data;
        },

        unassignThirdPartyProvider: async (id: string ): Promise<Consent> => {
            const response = await this.http.delete(`/Consent//thirdPartyProvider/${id}`);
            return response.data;
        },



        authorizedAccounts: async (parentId: string,options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Consent/authorizedAccounts/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAuthorizedAccounts: async (parentId: string,input: Account): Promise<Consent> => {
            const response = await this.http.post(`/Consent/authorizedAccounts/${parentId}/`,input);
            return response.data;
        },

        assignToAuthorizedAccounts: async (parentId: string,childIds: string[]): Promise<Consent> => {
            const response = await this.http.put(`/Consent/authorizedAccounts/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};


    thirdPartyProvider = {
        find: async (id: string): Promise<ThirdPartyProvider | null> => {
            const response = await this.http.get(`/ThirdPartyProvider/load/${id}`);
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

        update: async ( id: string, args: ThirdPartyProvider ): Promise<ThirdPartyProvider> => {
            const response = await this.http.put(`/ThirdPartyProvider/update/${id}`,args );
            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ThirdPartyProvider/delete/${id}`);
            return true;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/ThirdPartyProvider/bank/${id}`);
            return response.data;
        },

        assignToBank: async (id: string, bankId: string): Promise<ThirdPartyProvider> => {
            const response = await this.http.put(`/ThirdPartyProvider/bank/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBank: async (id: string ): Promise<ThirdPartyProvider> => {
            const response = await this.http.delete(`/ThirdPartyProvider//bank/${id}`);
            return response.data;
        },



        consents: async (parentId: string,options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/ThirdPartyProvider/consents/${parentId}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (parentId: string,input: Consent): Promise<ThirdPartyProvider> => {
            const response = await this.http.post(`/ThirdPartyProvider/consents/${parentId}/`,input);
            return response.data;
        },

        assignToConsents: async (parentId: string,childIds: string[]): Promise<ThirdPartyProvider> => {
            const response = await this.http.put(`/ThirdPartyProvider/consents/${parentId}/`,
                {
                    ids: childIds
                }
        );
        return response.data;
    },


};

}