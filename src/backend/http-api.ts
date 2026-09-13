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

        update: async (input: id: string, Bank ): Promise<Bank> => {
            const response = await this.http.put(`/Bank/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Bank/${id}`);
        return true;
    },



        branches: async (id: string, options?: PaginationOptions): Promise<Branch[]> => {
            const response = await this.http.get(`/Bank/branches/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToBranches: async (id: string,input: BranchInput): Promise<Bank> => {
            const response = await this.http.post(`/Bank/branches/${id}/`, input);
            return response.data;
        },

        assignToBranches: async (id: string, branchesIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/branches/${id}/`,
                {
                    ids: branchesIds
                }
            );
            return response.data;
},


        products: async (id: string, options?: PaginationOptions): Promise<BankingProduct[]> => {
            const response = await this.http.get(`/Bank/products/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToProducts: async (id: string,input: BankingProductInput): Promise<Bank> => {
            const response = await this.http.post(`/Bank/products/${id}/`, input);
            return response.data;
        },

        assignToProducts: async (id: string, productsIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/products/${id}/`,
                {
                    ids: productsIds
                }
            );
            return response.data;
},


        customers: async (id: string, options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/Bank/customers/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToCustomers: async (id: string,input: CustomerInput): Promise<Bank> => {
            const response = await this.http.post(`/Bank/customers/${id}/`, input);
            return response.data;
        },

        assignToCustomers: async (id: string, customersIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/customers/${id}/`,
                {
                    ids: customersIds
                }
            );
            return response.data;
},


        accounts: async (id: string, options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Bank/accounts/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (id: string,input: AccountInput): Promise<Bank> => {
            const response = await this.http.post(`/Bank/accounts/${id}/`, input);
            return response.data;
        },

        assignToAccounts: async (id: string, accountsIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/accounts/${id}/`,
                {
                    ids: accountsIds
                }
            );
            return response.data;
},


        paymentCards: async (id: string, options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/Bank/paymentCards/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (id: string,input: PaymentCardInput): Promise<Bank> => {
            const response = await this.http.post(`/Bank/paymentCards/${id}/`, input);
            return response.data;
        },

        assignToPaymentCards: async (id: string, paymentCardsIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/paymentCards/${id}/`,
                {
                    ids: paymentCardsIds
                }
            );
            return response.data;
},


        loanAccounts: async (id: string, options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Bank/loanAccounts/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (id: string,input: LoanAccountInput): Promise<Bank> => {
            const response = await this.http.post(`/Bank/loanAccounts/${id}/`, input);
            return response.data;
        },

        assignToLoanAccounts: async (id: string, loanAccountsIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/loanAccounts/${id}/`,
                {
                    ids: loanAccountsIds
                }
            );
            return response.data;
},


        exchangeRates: async (id: string, options?: PaginationOptions): Promise<ExchangeRate[]> => {
            const response = await this.http.get(`/Bank/exchangeRates/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToExchangeRates: async (id: string,input: ExchangeRateInput): Promise<Bank> => {
            const response = await this.http.post(`/Bank/exchangeRates/${id}/`, input);
            return response.data;
        },

        assignToExchangeRates: async (id: string, exchangeRatesIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/exchangeRates/${id}/`,
                {
                    ids: exchangeRatesIds
                }
            );
            return response.data;
},


        consents: async (id: string, options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/Bank/consents/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (id: string,input: ConsentInput): Promise<Bank> => {
            const response = await this.http.post(`/Bank/consents/${id}/`, input);
            return response.data;
        },

        assignToConsents: async (id: string, consentsIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/consents/${id}/`,
                {
                    ids: consentsIds
                }
            );
            return response.data;
},


        thirdPartyProviders: async (id: string, options?: PaginationOptions): Promise<ThirdPartyProvider[]> => {
            const response = await this.http.get(`/Bank/thirdPartyProviders/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToThirdPartyProviders: async (id: string,input: ThirdPartyProviderInput): Promise<Bank> => {
            const response = await this.http.post(`/Bank/thirdPartyProviders/${id}/`, input);
            return response.data;
        },

        assignToThirdPartyProviders: async (id: string, thirdPartyProvidersIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/thirdPartyProviders/${id}/`,
                {
                    ids: thirdPartyProvidersIds
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

        update: async (input: id: string, Branch ): Promise<Branch> => {
            const response = await this.http.put(`/Branch/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Branch/${id}`);
        return true;
    },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Branch/bank/${id}`);
            return response.data;
        },

        addBank: async (id: string,input: BankInput): Promise<Branch> => {
            const response = await this.http.post(
            `/Branch/bank/${id}/`,input);
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



        accounts: async (id: string, options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Branch/accounts/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (id: string,input: AccountInput): Promise<Branch> => {
            const response = await this.http.post(`/Branch/accounts/${id}/`, input);
            return response.data;
        },

        assignToAccounts: async (id: string, accountsIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/accounts/${id}/`,
                {
                    ids: accountsIds
                }
            );
            return response.data;
},


        loanAccounts: async (id: string, options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Branch/loanAccounts/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (id: string,input: LoanAccountInput): Promise<Branch> => {
            const response = await this.http.post(`/Branch/loanAccounts/${id}/`, input);
            return response.data;
        },

        assignToLoanAccounts: async (id: string, loanAccountsIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/loanAccounts/${id}/`,
                {
                    ids: loanAccountsIds
                }
            );
            return response.data;
},


        atms: async (id: string, options?: PaginationOptions): Promise<ATM[]> => {
            const response = await this.http.get(`/Branch/atms/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAtms: async (id: string,input: ATMInput): Promise<Branch> => {
            const response = await this.http.post(`/Branch/atms/${id}/`, input);
            return response.data;
        },

        assignToAtms: async (id: string, atmsIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/atms/${id}/`,
                {
                    ids: atmsIds
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

        update: async (input: id: string, ATM ): Promise<ATM> => {
            const response = await this.http.put(`/ATM/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ATM/${id}`);
        return true;
    },


        branch: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/ATM/branch/${id}`);
            return response.data;
        },

        addBranch: async (id: string,input: BranchInput): Promise<ATM> => {
            const response = await this.http.post(
            `/ATM/branch/${id}/`,input);
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

        update: async (input: id: string, Customer ): Promise<Customer> => {
            const response = await this.http.put(`/Customer/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Customer/${id}`);
        return true;
    },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Customer/bank/${id}`);
            return response.data;
        },

        addBank: async (id: string,input: BankInput): Promise<Customer> => {
            const response = await this.http.post(
            `/Customer/bank/${id}/`,input);
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



        accounts: async (id: string, options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Customer/accounts/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (id: string,input: AccountInput): Promise<Customer> => {
            const response = await this.http.post(`/Customer/accounts/${id}/`, input);
            return response.data;
        },

        assignToAccounts: async (id: string, accountsIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/accounts/${id}/`,
                {
                    ids: accountsIds
                }
            );
            return response.data;
},


        loanAccounts: async (id: string, options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/Customer/loanAccounts/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (id: string,input: LoanAccountInput): Promise<Customer> => {
            const response = await this.http.post(`/Customer/loanAccounts/${id}/`, input);
            return response.data;
        },

        assignToLoanAccounts: async (id: string, loanAccountsIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/loanAccounts/${id}/`,
                {
                    ids: loanAccountsIds
                }
            );
            return response.data;
},


        paymentCards: async (id: string, options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/Customer/paymentCards/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (id: string,input: PaymentCardInput): Promise<Customer> => {
            const response = await this.http.post(`/Customer/paymentCards/${id}/`, input);
            return response.data;
        },

        assignToPaymentCards: async (id: string, paymentCardsIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/paymentCards/${id}/`,
                {
                    ids: paymentCardsIds
                }
            );
            return response.data;
},


        externalAccounts: async (id: string, options?: PaginationOptions): Promise<ExternalAccount[]> => {
            const response = await this.http.get(`/Customer/externalAccounts/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToExternalAccounts: async (id: string,input: ExternalAccountInput): Promise<Customer> => {
            const response = await this.http.post(`/Customer/externalAccounts/${id}/`, input);
            return response.data;
        },

        assignToExternalAccounts: async (id: string, externalAccountsIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/externalAccounts/${id}/`,
                {
                    ids: externalAccountsIds
                }
            );
            return response.data;
},


        fundsTransfers: async (id: string, options?: PaginationOptions): Promise<FundsTransfer[]> => {
            const response = await this.http.get(`/Customer/fundsTransfers/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFundsTransfers: async (id: string,input: FundsTransferInput): Promise<Customer> => {
            const response = await this.http.post(`/Customer/fundsTransfers/${id}/`, input);
            return response.data;
        },

        assignToFundsTransfers: async (id: string, fundsTransfersIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/fundsTransfers/${id}/`,
                {
                    ids: fundsTransfersIds
                }
            );
            return response.data;
},


        disputes: async (id: string, options?: PaginationOptions): Promise<Dispute[]> => {
            const response = await this.http.get(`/Customer/disputes/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToDisputes: async (id: string,input: DisputeInput): Promise<Customer> => {
            const response = await this.http.post(`/Customer/disputes/${id}/`, input);
            return response.data;
        },

        assignToDisputes: async (id: string, disputesIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/disputes/${id}/`,
                {
                    ids: disputesIds
                }
            );
            return response.data;
},


        kycProfiles: async (id: string, options?: PaginationOptions): Promise<KycProfile[]> => {
            const response = await this.http.get(`/Customer/kycProfiles/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToKycProfiles: async (id: string,input: KycProfileInput): Promise<Customer> => {
            const response = await this.http.post(`/Customer/kycProfiles/${id}/`, input);
            return response.data;
        },

        assignToKycProfiles: async (id: string, kycProfilesIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/kycProfiles/${id}/`,
                {
                    ids: kycProfilesIds
                }
            );
            return response.data;
},


        consents: async (id: string, options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/Customer/consents/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (id: string,input: ConsentInput): Promise<Customer> => {
            const response = await this.http.post(`/Customer/consents/${id}/`, input);
            return response.data;
        },

        assignToConsents: async (id: string, consentsIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/consents/${id}/`,
                {
                    ids: consentsIds
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

        update: async (input: id: string, KycProfile ): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/KycProfile/${id}`);
        return true;
    },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/KycProfile/customer/${id}`);
            return response.data;
        },

        addCustomer: async (id: string,input: CustomerInput): Promise<KycProfile> => {
            const response = await this.http.post(
            `/KycProfile/customer/${id}/`,input);
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



        identityDocuments: async (id: string, options?: PaginationOptions): Promise<IdentityDocument[]> => {
            const response = await this.http.get(`/KycProfile/identityDocuments/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToIdentityDocuments: async (id: string,input: IdentityDocumentInput): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/identityDocuments/${id}/`, input);
            return response.data;
        },

        assignToIdentityDocuments: async (id: string, identityDocumentsIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/identityDocuments/${id}/`,
                {
                    ids: identityDocumentsIds
                }
            );
            return response.data;
},


        riskAssessments: async (id: string, options?: PaginationOptions): Promise<RiskAssessment[]> => {
            const response = await this.http.get(`/KycProfile/riskAssessments/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToRiskAssessments: async (id: string,input: RiskAssessmentInput): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/riskAssessments/${id}/`, input);
            return response.data;
        },

        assignToRiskAssessments: async (id: string, riskAssessmentsIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/riskAssessments/${id}/`,
                {
                    ids: riskAssessmentsIds
                }
            );
            return response.data;
},


        screenings: async (id: string, options?: PaginationOptions): Promise<ScreeningResult[]> => {
            const response = await this.http.get(`/KycProfile/screenings/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToScreenings: async (id: string,input: ScreeningResultInput): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/screenings/${id}/`, input);
            return response.data;
        },

        assignToScreenings: async (id: string, screeningsIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/screenings/${id}/`,
                {
                    ids: screeningsIds
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

        update: async (input: id: string, IdentityDocument ): Promise<IdentityDocument> => {
            const response = await this.http.put(`/IdentityDocument/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/IdentityDocument/${id}`);
        return true;
    },


        kycProfile: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/IdentityDocument/kycProfile/${id}`);
            return response.data;
        },

        addKycProfile: async (id: string,input: KycProfileInput): Promise<IdentityDocument> => {
            const response = await this.http.post(
            `/IdentityDocument/kycProfile/${id}/`,input);
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

        update: async (input: id: string, RiskAssessment ): Promise<RiskAssessment> => {
            const response = await this.http.put(`/RiskAssessment/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/RiskAssessment/${id}`);
        return true;
    },


        kycProfile: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/RiskAssessment/kycProfile/${id}`);
            return response.data;
        },

        addKycProfile: async (id: string,input: KycProfileInput): Promise<RiskAssessment> => {
            const response = await this.http.post(
            `/RiskAssessment/kycProfile/${id}/`,input);
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

        update: async (input: id: string, ScreeningResult ): Promise<ScreeningResult> => {
            const response = await this.http.put(`/ScreeningResult/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ScreeningResult/${id}`);
        return true;
    },


        kycProfile: async (id: string): Promise<KycProfile | null> => {
            const response = await this.http.get(`/ScreeningResult/kycProfile/${id}`);
            return response.data;
        },

        addKycProfile: async (id: string,input: KycProfileInput): Promise<ScreeningResult> => {
            const response = await this.http.post(
            `/ScreeningResult/kycProfile/${id}/`,input);
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

        update: async (input: id: string, BankingProduct ): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/BankingProduct/${id}`);
        return true;
    },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/BankingProduct/bank/${id}`);
            return response.data;
        },

        addBank: async (id: string,input: BankInput): Promise<BankingProduct> => {
            const response = await this.http.post(
            `/BankingProduct/bank/${id}/`,input);
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



        accounts: async (id: string, options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/BankingProduct/accounts/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAccounts: async (id: string,input: AccountInput): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/accounts/${id}/`, input);
            return response.data;
        },

        assignToAccounts: async (id: string, accountsIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/accounts/${id}/`,
                {
                    ids: accountsIds
                }
            );
            return response.data;
},


        loanAccounts: async (id: string, options?: PaginationOptions): Promise<LoanAccount[]> => {
            const response = await this.http.get(`/BankingProduct/loanAccounts/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToLoanAccounts: async (id: string,input: LoanAccountInput): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/loanAccounts/${id}/`, input);
            return response.data;
        },

        assignToLoanAccounts: async (id: string, loanAccountsIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/loanAccounts/${id}/`,
                {
                    ids: loanAccountsIds
                }
            );
            return response.data;
},


        paymentCards: async (id: string, options?: PaginationOptions): Promise<PaymentCard[]> => {
            const response = await this.http.get(`/BankingProduct/paymentCards/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPaymentCards: async (id: string,input: PaymentCardInput): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/paymentCards/${id}/`, input);
            return response.data;
        },

        assignToPaymentCards: async (id: string, paymentCardsIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/paymentCards/${id}/`,
                {
                    ids: paymentCardsIds
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

        update: async (input: id: string, Account ): Promise<Account> => {
            const response = await this.http.put(`/Account/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Account/${id}`);
        return true;
    },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Account/bank/${id}`);
            return response.data;
        },

        addBank: async (id: string,input: BankInput): Promise<Account> => {
            const response = await this.http.post(
            `/Account/bank/${id}/`,input);
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

        addBranch: async (id: string,input: BranchInput): Promise<Account> => {
            const response = await this.http.post(
            `/Account/branch/${id}/`,input);
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

        addProduct: async (id: string,input: BankingProductInput): Promise<Account> => {
            const response = await this.http.post(
            `/Account/product/${id}/`,input);
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



        owners: async (id: string, options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/Account/owners/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToOwners: async (id: string,input: CustomerInput): Promise<Account> => {
            const response = await this.http.post(`/Account/owners/${id}/`, input);
            return response.data;
        },

        assignToOwners: async (id: string, ownersIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/owners/${id}/`,
                {
                    ids: ownersIds
                }
            );
            return response.data;
},


        transactions: async (id: string, options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/Account/transactions/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (id: string,input: TransactionInput): Promise<Account> => {
            const response = await this.http.post(`/Account/transactions/${id}/`, input);
            return response.data;
        },

        assignToTransactions: async (id: string, transactionsIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/transactions/${id}/`,
                {
                    ids: transactionsIds
                }
            );
            return response.data;
},


        statements: async (id: string, options?: PaginationOptions): Promise<AccountStatement[]> => {
            const response = await this.http.get(`/Account/statements/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToStatements: async (id: string,input: AccountStatementInput): Promise<Account> => {
            const response = await this.http.post(`/Account/statements/${id}/`, input);
            return response.data;
        },

        assignToStatements: async (id: string, statementsIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/statements/${id}/`,
                {
                    ids: statementsIds
                }
            );
            return response.data;
},


        standingInstructions: async (id: string, options?: PaginationOptions): Promise<StandingInstruction[]> => {
            const response = await this.http.get(`/Account/standingInstructions/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToStandingInstructions: async (id: string,input: StandingInstructionInput): Promise<Account> => {
            const response = await this.http.post(`/Account/standingInstructions/${id}/`, input);
            return response.data;
        },

        assignToStandingInstructions: async (id: string, standingInstructionsIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/standingInstructions/${id}/`,
                {
                    ids: standingInstructionsIds
                }
            );
            return response.data;
},


        feeCharges: async (id: string, options?: PaginationOptions): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/Account/feeCharges/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFeeCharges: async (id: string,input: FeeChargeInput): Promise<Account> => {
            const response = await this.http.post(`/Account/feeCharges/${id}/`, input);
            return response.data;
        },

        assignToFeeCharges: async (id: string, feeChargesIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/feeCharges/${id}/`,
                {
                    ids: feeChargesIds
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

        update: async (input: id: string, AccountStatement ): Promise<AccountStatement> => {
            const response = await this.http.put(`/AccountStatement/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/AccountStatement/${id}`);
        return true;
    },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/AccountStatement/account/${id}`);
            return response.data;
        },

        addAccount: async (id: string,input: AccountInput): Promise<AccountStatement> => {
            const response = await this.http.post(
            `/AccountStatement/account/${id}/`,input);
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

        update: async (input: id: string, Transaction ): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Transaction/${id}`);
        return true;
    },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/Transaction/account/${id}`);
            return response.data;
        },

        addAccount: async (id: string,input: AccountInput): Promise<Transaction> => {
            const response = await this.http.post(
            `/Transaction/account/${id}/`,input);
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

        addExternalCounterparty: async (id: string,input: ExternalAccountInput): Promise<Transaction> => {
            const response = await this.http.post(
            `/Transaction/externalCounterparty/${id}/`,input);
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

        addPaymentCard: async (id: string,input: PaymentCardInput): Promise<Transaction> => {
            const response = await this.http.post(
            `/Transaction/paymentCard/${id}/`,input);
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

        addFundsTransfer: async (id: string,input: FundsTransferInput): Promise<Transaction> => {
            const response = await this.http.post(
            `/Transaction/fundsTransfer/${id}/`,input);
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

        addFxTrade: async (id: string,input: FXTradeInput): Promise<Transaction> => {
            const response = await this.http.post(
            `/Transaction/fxTrade/${id}/`,input);
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

        addDispute: async (id: string,input: DisputeInput): Promise<Transaction> => {
            const response = await this.http.post(
            `/Transaction/dispute/${id}/`,input);
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

        update: async (input: id: string, ExternalAccount ): Promise<ExternalAccount> => {
            const response = await this.http.put(`/ExternalAccount/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ExternalAccount/${id}`);
        return true;
    },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/ExternalAccount/customer/${id}`);
            return response.data;
        },

        addCustomer: async (id: string,input: CustomerInput): Promise<ExternalAccount> => {
            const response = await this.http.post(
            `/ExternalAccount/customer/${id}/`,input);
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



        transactions: async (id: string, options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/ExternalAccount/transactions/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (id: string,input: TransactionInput): Promise<ExternalAccount> => {
            const response = await this.http.post(`/ExternalAccount/transactions/${id}/`, input);
            return response.data;
        },

        assignToTransactions: async (id: string, transactionsIds: string[]): Promise<ExternalAccount> => {
            const response = await this.http.put(`/ExternalAccount/transactions/${id}/`,
                {
                    ids: transactionsIds
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

        update: async (input: id: string, FundsTransfer ): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/FundsTransfer/${id}`);
        return true;
    },


        sourceAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FundsTransfer/sourceAccount/${id}`);
            return response.data;
        },

        addSourceAccount: async (id: string,input: AccountInput): Promise<FundsTransfer> => {
            const response = await this.http.post(
            `/FundsTransfer/sourceAccount/${id}/`,input);
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

        addDestinationAccount: async (id: string,input: AccountInput): Promise<FundsTransfer> => {
            const response = await this.http.post(
            `/FundsTransfer/destinationAccount/${id}/`,input);
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

        addExternalBeneficiary: async (id: string,input: ExternalAccountInput): Promise<FundsTransfer> => {
            const response = await this.http.post(
            `/FundsTransfer/externalBeneficiary/${id}/`,input);
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

        addInitiatedBy: async (id: string,input: CustomerInput): Promise<FundsTransfer> => {
            const response = await this.http.post(
            `/FundsTransfer/initiatedBy/${id}/`,input);
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



        transactions: async (id: string, options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/FundsTransfer/transactions/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (id: string,input: TransactionInput): Promise<FundsTransfer> => {
            const response = await this.http.post(`/FundsTransfer/transactions/${id}/`, input);
            return response.data;
        },

        assignToTransactions: async (id: string, transactionsIds: string[]): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/transactions/${id}/`,
                {
                    ids: transactionsIds
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

        update: async (input: id: string, StandingInstruction ): Promise<StandingInstruction> => {
            const response = await this.http.put(`/StandingInstruction/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/StandingInstruction/${id}`);
        return true;
    },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/StandingInstruction/account/${id}`);
            return response.data;
        },

        addAccount: async (id: string,input: AccountInput): Promise<StandingInstruction> => {
            const response = await this.http.post(
            `/StandingInstruction/account/${id}/`,input);
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

        addBeneficiary: async (id: string,input: ExternalAccountInput): Promise<StandingInstruction> => {
            const response = await this.http.post(
            `/StandingInstruction/beneficiary/${id}/`,input);
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

        update: async (input: id: string, PaymentCard ): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/PaymentCard/${id}`);
        return true;
    },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/PaymentCard/bank/${id}`);
            return response.data;
        },

        addBank: async (id: string,input: BankInput): Promise<PaymentCard> => {
            const response = await this.http.post(
            `/PaymentCard/bank/${id}/`,input);
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

        addAccount: async (id: string,input: AccountInput): Promise<PaymentCard> => {
            const response = await this.http.post(
            `/PaymentCard/account/${id}/`,input);
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

        addCustomer: async (id: string,input: CustomerInput): Promise<PaymentCard> => {
            const response = await this.http.post(
            `/PaymentCard/customer/${id}/`,input);
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



        transactions: async (id: string, options?: PaginationOptions): Promise<Transaction[]> => {
            const response = await this.http.get(`/PaymentCard/transactions/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToTransactions: async (id: string,input: TransactionInput): Promise<PaymentCard> => {
            const response = await this.http.post(`/PaymentCard/transactions/${id}/`, input);
            return response.data;
        },

        assignToTransactions: async (id: string, transactionsIds: string[]): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/transactions/${id}/`,
                {
                    ids: transactionsIds
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

        update: async (input: id: string, LoanAccount ): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/LoanAccount/${id}`);
        return true;
    },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/LoanAccount/bank/${id}`);
            return response.data;
        },

        addBank: async (id: string,input: BankInput): Promise<LoanAccount> => {
            const response = await this.http.post(
            `/LoanAccount/bank/${id}/`,input);
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

        addBranch: async (id: string,input: BranchInput): Promise<LoanAccount> => {
            const response = await this.http.post(
            `/LoanAccount/branch/${id}/`,input);
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

        addProduct: async (id: string,input: BankingProductInput): Promise<LoanAccount> => {
            const response = await this.http.post(
            `/LoanAccount/product/${id}/`,input);
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



        borrowers: async (id: string, options?: PaginationOptions): Promise<Customer[]> => {
            const response = await this.http.get(`/LoanAccount/borrowers/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToBorrowers: async (id: string,input: CustomerInput): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/borrowers/${id}/`, input);
            return response.data;
        },

        assignToBorrowers: async (id: string, borrowersIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/borrowers/${id}/`,
                {
                    ids: borrowersIds
                }
            );
            return response.data;
},


        repaymentSchedule: async (id: string, options?: PaginationOptions): Promise<RepaymentSchedule[]> => {
            const response = await this.http.get(`/LoanAccount/repaymentSchedule/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToRepaymentSchedule: async (id: string,input: RepaymentScheduleInput): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/repaymentSchedule/${id}/`, input);
            return response.data;
        },

        assignToRepaymentSchedule: async (id: string, repaymentScheduleIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/repaymentSchedule/${id}/`,
                {
                    ids: repaymentScheduleIds
                }
            );
            return response.data;
},


        payments: async (id: string, options?: PaginationOptions): Promise<LoanPayment[]> => {
            const response = await this.http.get(`/LoanAccount/payments/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToPayments: async (id: string,input: LoanPaymentInput): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/payments/${id}/`, input);
            return response.data;
        },

        assignToPayments: async (id: string, paymentsIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/payments/${id}/`,
                {
                    ids: paymentsIds
                }
            );
            return response.data;
},


        collateral: async (id: string, options?: PaginationOptions): Promise<Collateral[]> => {
            const response = await this.http.get(`/LoanAccount/collateral/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToCollateral: async (id: string,input: CollateralInput): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/collateral/${id}/`, input);
            return response.data;
        },

        assignToCollateral: async (id: string, collateralIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/collateral/${id}/`,
                {
                    ids: collateralIds
                }
            );
            return response.data;
},


        feeCharges: async (id: string, options?: PaginationOptions): Promise<FeeCharge[]> => {
            const response = await this.http.get(`/LoanAccount/feeCharges/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFeeCharges: async (id: string,input: FeeChargeInput): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/feeCharges/${id}/`, input);
            return response.data;
        },

        assignToFeeCharges: async (id: string, feeChargesIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/feeCharges/${id}/`,
                {
                    ids: feeChargesIds
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

        update: async (input: id: string, RepaymentSchedule ): Promise<RepaymentSchedule> => {
            const response = await this.http.put(`/RepaymentSchedule/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/RepaymentSchedule/${id}`);
        return true;
    },


        loanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/RepaymentSchedule/loanAccount/${id}`);
            return response.data;
        },

        addLoanAccount: async (id: string,input: LoanAccountInput): Promise<RepaymentSchedule> => {
            const response = await this.http.post(
            `/RepaymentSchedule/loanAccount/${id}/`,input);
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

        addPayment: async (id: string,input: LoanPaymentInput): Promise<RepaymentSchedule> => {
            const response = await this.http.post(
            `/RepaymentSchedule/payment/${id}/`,input);
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

        update: async (input: id: string, LoanPayment ): Promise<LoanPayment> => {
            const response = await this.http.put(`/LoanPayment/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/LoanPayment/${id}`);
        return true;
    },


        loanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/LoanPayment/loanAccount/${id}`);
            return response.data;
        },

        addLoanAccount: async (id: string,input: LoanAccountInput): Promise<LoanPayment> => {
            const response = await this.http.post(
            `/LoanPayment/loanAccount/${id}/`,input);
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

        addTransaction: async (id: string,input: TransactionInput): Promise<LoanPayment> => {
            const response = await this.http.post(
            `/LoanPayment/transaction/${id}/`,input);
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

        update: async (input: id: string, Collateral ): Promise<Collateral> => {
            const response = await this.http.put(`/Collateral/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Collateral/${id}`);
        return true;
    },


        loanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/Collateral/loanAccount/${id}`);
            return response.data;
        },

        addLoanAccount: async (id: string,input: LoanAccountInput): Promise<Collateral> => {
            const response = await this.http.post(
            `/Collateral/loanAccount/${id}/`,input);
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

        update: async (input: id: string, FeeCharge ): Promise<FeeCharge> => {
            const response = await this.http.put(`/FeeCharge/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/FeeCharge/${id}`);
        return true;
    },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FeeCharge/account/${id}`);
            return response.data;
        },

        addAccount: async (id: string,input: AccountInput): Promise<FeeCharge> => {
            const response = await this.http.post(
            `/FeeCharge/account/${id}/`,input);
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

        addLoanAccount: async (id: string,input: LoanAccountInput): Promise<FeeCharge> => {
            const response = await this.http.post(
            `/FeeCharge/loanAccount/${id}/`,input);
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

        update: async (input: id: string, ExchangeRate ): Promise<ExchangeRate> => {
            const response = await this.http.put(`/ExchangeRate/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ExchangeRate/${id}`);
        return true;
    },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/ExchangeRate/bank/${id}`);
            return response.data;
        },

        addBank: async (id: string,input: BankInput): Promise<ExchangeRate> => {
            const response = await this.http.post(
            `/ExchangeRate/bank/${id}/`,input);
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



        fxTrades: async (id: string, options?: PaginationOptions): Promise<FXTrade[]> => {
            const response = await this.http.get(`/ExchangeRate/fxTrades/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToFxTrades: async (id: string,input: FXTradeInput): Promise<ExchangeRate> => {
            const response = await this.http.post(`/ExchangeRate/fxTrades/${id}/`, input);
            return response.data;
        },

        assignToFxTrades: async (id: string, fxTradesIds: string[]): Promise<ExchangeRate> => {
            const response = await this.http.put(`/ExchangeRate/fxTrades/${id}/`,
                {
                    ids: fxTradesIds
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

        update: async (input: id: string, FXTrade ): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/FXTrade/${id}`);
        return true;
    },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/FXTrade/customer/${id}`);
            return response.data;
        },

        addCustomer: async (id: string,input: CustomerInput): Promise<FXTrade> => {
            const response = await this.http.post(
            `/FXTrade/customer/${id}/`,input);
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

        addBank: async (id: string,input: BankInput): Promise<FXTrade> => {
            const response = await this.http.post(
            `/FXTrade/bank/${id}/`,input);
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

        addExchangeRate: async (id: string,input: ExchangeRateInput): Promise<FXTrade> => {
            const response = await this.http.post(
            `/FXTrade/exchangeRate/${id}/`,input);
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

        addSourceAccount: async (id: string,input: AccountInput): Promise<FXTrade> => {
            const response = await this.http.post(
            `/FXTrade/sourceAccount/${id}/`,input);
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

        addDestinationAccount: async (id: string,input: AccountInput): Promise<FXTrade> => {
            const response = await this.http.post(
            `/FXTrade/destinationAccount/${id}/`,input);
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

        addTransaction: async (id: string,input: TransactionInput): Promise<FXTrade> => {
            const response = await this.http.post(
            `/FXTrade/transaction/${id}/`,input);
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

        update: async (input: id: string, Dispute ): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Dispute/${id}`);
        return true;
    },


        transaction: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/Dispute/transaction/${id}`);
            return response.data;
        },

        addTransaction: async (id: string,input: TransactionInput): Promise<Dispute> => {
            const response = await this.http.post(
            `/Dispute/transaction/${id}/`,input);
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

        addCustomer: async (id: string,input: CustomerInput): Promise<Dispute> => {
            const response = await this.http.post(
            `/Dispute/customer/${id}/`,input);
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

        addAccount: async (id: string,input: AccountInput): Promise<Dispute> => {
            const response = await this.http.post(
            `/Dispute/account/${id}/`,input);
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

        addPaymentCard: async (id: string,input: PaymentCardInput): Promise<Dispute> => {
            const response = await this.http.post(
            `/Dispute/paymentCard/${id}/`,input);
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

        update: async (input: id: string, Consent ): Promise<Consent> => {
            const response = await this.http.put(`/Consent/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/Consent/${id}`);
        return true;
    },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/Consent/customer/${id}`);
            return response.data;
        },

        addCustomer: async (id: string,input: CustomerInput): Promise<Consent> => {
            const response = await this.http.post(
            `/Consent/customer/${id}/`,input);
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

        addBank: async (id: string,input: BankInput): Promise<Consent> => {
            const response = await this.http.post(
            `/Consent/bank/${id}/`,input);
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

        addThirdPartyProvider: async (id: string,input: ThirdPartyProviderInput): Promise<Consent> => {
            const response = await this.http.post(
            `/Consent/thirdPartyProvider/${id}/`,input);
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



        authorizedAccounts: async (id: string, options?: PaginationOptions): Promise<Account[]> => {
            const response = await this.http.get(`/Consent/authorizedAccounts/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToAuthorizedAccounts: async (id: string,input: AccountInput): Promise<Consent> => {
            const response = await this.http.post(`/Consent/authorizedAccounts/${id}/`, input);
            return response.data;
        },

        assignToAuthorizedAccounts: async (id: string, authorizedAccountsIds: string[]): Promise<Consent> => {
            const response = await this.http.put(`/Consent/authorizedAccounts/${id}/`,
                {
                    ids: authorizedAccountsIds
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

        update: async (input: id: string, ThirdPartyProvider ): Promise<ThirdPartyProvider> => {
            const response = await this.http.put(`/ThirdPartyProvider/update/${id}`,input );

            return response.data;
        },

        remove: async ( id: string ): Promise<boolean> => {
            await this.http.delete( `/ThirdPartyProvider/${id}`);
        return true;
    },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/ThirdPartyProvider/bank/${id}`);
            return response.data;
        },

        addBank: async (id: string,input: BankInput): Promise<ThirdPartyProvider> => {
            const response = await this.http.post(
            `/ThirdPartyProvider/bank/${id}/`,input);
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



        consents: async (id: string, options?: PaginationOptions): Promise<Consent[]> => {
            const response = await this.http.get(`/ThirdPartyProvider/consents/${id}/`,
                {
                    params: options
                }
            );
            return response.data;
        },

        addToConsents: async (id: string,input: ConsentInput): Promise<ThirdPartyProvider> => {
            const response = await this.http.post(`/ThirdPartyProvider/consents/${id}/`, input);
            return response.data;
        },

        assignToConsents: async (id: string, consentsIds: string[]): Promise<ThirdPartyProvider> => {
            const response = await this.http.put(`/ThirdPartyProvider/consents/${id}/`,
                {
                    ids: consentsIds
                }
            );
            return response.data;
},


};

}