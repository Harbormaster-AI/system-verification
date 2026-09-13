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

        addBranchesToBank: async (parentId: string,input: Branch): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addBranchesToBank/${parentId}/`,input);
            return response.data;
        },

        removeBranchesFromBank: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFomBranches/${parentId}/`,
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

        addProductsToBank: async (parentId: string,input: BankingProduct): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addProductsToBank/${parentId}/`,input);
            return response.data;
        },

        removeProductsFromBank: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFomProducts/${parentId}/`,
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

        addCustomersToBank: async (parentId: string,input: Customer): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addCustomersToBank/${parentId}/`,input);
            return response.data;
        },

        removeCustomersFromBank: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFomCustomers/${parentId}/`,
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

        addAccountsToBank: async (parentId: string,input: Account): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addAccountsToBank/${parentId}/`,input);
            return response.data;
        },

        removeAccountsFromBank: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFomAccounts/${parentId}/`,
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

        addPaymentCardsToBank: async (parentId: string,input: PaymentCard): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addPaymentCardsToBank/${parentId}/`,input);
            return response.data;
        },

        removePaymentCardsFromBank: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFomPaymentCards/${parentId}/`,
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

        addLoanAccountsToBank: async (parentId: string,input: LoanAccount): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addLoanAccountsToBank/${parentId}/`,input);
            return response.data;
        },

        removeLoanAccountsFromBank: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFomLoanAccounts/${parentId}/`,
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

        addExchangeRatesToBank: async (parentId: string,input: ExchangeRate): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addExchangeRatesToBank/${parentId}/`,input);
            return response.data;
        },

        removeExchangeRatesFromBank: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFomExchangeRates/${parentId}/`,
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

        addConsentsToBank: async (parentId: string,input: Consent): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addConsentsToBank/${parentId}/`,input);
            return response.data;
        },

        removeConsentsFromBank: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFomConsents/${parentId}/`,
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

        addThirdPartyProvidersToBank: async (parentId: string,input: ThirdPartyProvider): Promise<Bank> => {
            const response = await this.http.post(`/Bank/addThirdPartyProvidersToBank/${parentId}/`,input);
            return response.data;
        },

        removeThirdPartyProvidersFromBank: async (parentId: string,childIds: string[]): Promise<Bank> => {
            const response = await this.http.put(`/Bank/removeFomThirdPartyProviders/${parentId}/`,
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

        assignBankToBranch: async (id: string, bankId: string): Promise<Branch> => {
            const response = await this.http.put(`/Branch/assignBankToBranch/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBankFromBranch: async (id: string ): Promise<Branch> => {
            const response = await this.http.delete(`/Branch/unassignBankFromBranch/${id}`);
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

        addAccountsToBranch: async (parentId: string,input: Account): Promise<Branch> => {
            const response = await this.http.post(`/Branch/addAccountsToBranch/${parentId}/`,input);
            return response.data;
        },

        removeAccountsFromBranch: async (parentId: string,childIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/removeFomAccounts/${parentId}/`,
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

        addLoanAccountsToBranch: async (parentId: string,input: LoanAccount): Promise<Branch> => {
            const response = await this.http.post(`/Branch/addLoanAccountsToBranch/${parentId}/`,input);
            return response.data;
        },

        removeLoanAccountsFromBranch: async (parentId: string,childIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/removeFomLoanAccounts/${parentId}/`,
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

        addAtmsToBranch: async (parentId: string,input: ATM): Promise<Branch> => {
            const response = await this.http.post(`/Branch/addAtmsToBranch/${parentId}/`,input);
            return response.data;
        },

        removeAtmsFromBranch: async (parentId: string,childIds: string[]): Promise<Branch> => {
            const response = await this.http.put(`/Branch/removeFomAtms/${parentId}/`,
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

        assignBranchToATM: async (id: string, branchId: string): Promise<ATM> => {
            const response = await this.http.put(`/ATM/assignBranchToATM/${id}`,
                {
                    id: branchId
                }
            );
            return response.data;
        },

        unassignBranchFromATM: async (id: string ): Promise<ATM> => {
            const response = await this.http.delete(`/ATM/unassignBranchFromATM/${id}`);
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

        assignBankToCustomer: async (id: string, bankId: string): Promise<Customer> => {
            const response = await this.http.put(`/Customer/assignBankToCustomer/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBankFromCustomer: async (id: string ): Promise<Customer> => {
            const response = await this.http.delete(`/Customer/unassignBankFromCustomer/${id}`);
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

        addAccountsToCustomer: async (parentId: string,input: Account): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addAccountsToCustomer/${parentId}/`,input);
            return response.data;
        },

        removeAccountsFromCustomer: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFomAccounts/${parentId}/`,
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

        addLoanAccountsToCustomer: async (parentId: string,input: LoanAccount): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addLoanAccountsToCustomer/${parentId}/`,input);
            return response.data;
        },

        removeLoanAccountsFromCustomer: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFomLoanAccounts/${parentId}/`,
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

        addPaymentCardsToCustomer: async (parentId: string,input: PaymentCard): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addPaymentCardsToCustomer/${parentId}/`,input);
            return response.data;
        },

        removePaymentCardsFromCustomer: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFomPaymentCards/${parentId}/`,
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

        addExternalAccountsToCustomer: async (parentId: string,input: ExternalAccount): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addExternalAccountsToCustomer/${parentId}/`,input);
            return response.data;
        },

        removeExternalAccountsFromCustomer: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFomExternalAccounts/${parentId}/`,
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

        addFundsTransfersToCustomer: async (parentId: string,input: FundsTransfer): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addFundsTransfersToCustomer/${parentId}/`,input);
            return response.data;
        },

        removeFundsTransfersFromCustomer: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFomFundsTransfers/${parentId}/`,
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

        addDisputesToCustomer: async (parentId: string,input: Dispute): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addDisputesToCustomer/${parentId}/`,input);
            return response.data;
        },

        removeDisputesFromCustomer: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFomDisputes/${parentId}/`,
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

        addKycProfilesToCustomer: async (parentId: string,input: KycProfile): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addKycProfilesToCustomer/${parentId}/`,input);
            return response.data;
        },

        removeKycProfilesFromCustomer: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFomKycProfiles/${parentId}/`,
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

        addConsentsToCustomer: async (parentId: string,input: Consent): Promise<Customer> => {
            const response = await this.http.post(`/Customer/addConsentsToCustomer/${parentId}/`,input);
            return response.data;
        },

        removeConsentsFromCustomer: async (parentId: string,childIds: string[]): Promise<Customer> => {
            const response = await this.http.put(`/Customer/removeFomConsents/${parentId}/`,
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

        assignCustomerToKycProfile: async (id: string, customerId: string): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/assignCustomerToKycProfile/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomerFromKycProfile: async (id: string ): Promise<KycProfile> => {
            const response = await this.http.delete(`/KycProfile/unassignCustomerFromKycProfile/${id}`);
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

        addIdentityDocumentsToKycProfile: async (parentId: string,input: IdentityDocument): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/addIdentityDocumentsToKycProfile/${parentId}/`,input);
            return response.data;
        },

        removeIdentityDocumentsFromKycProfile: async (parentId: string,childIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/removeFomIdentityDocuments/${parentId}/`,
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

        addRiskAssessmentsToKycProfile: async (parentId: string,input: RiskAssessment): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/addRiskAssessmentsToKycProfile/${parentId}/`,input);
            return response.data;
        },

        removeRiskAssessmentsFromKycProfile: async (parentId: string,childIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/removeFomRiskAssessments/${parentId}/`,
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

        addScreeningsToKycProfile: async (parentId: string,input: ScreeningResult): Promise<KycProfile> => {
            const response = await this.http.post(`/KycProfile/addScreeningsToKycProfile/${parentId}/`,input);
            return response.data;
        },

        removeScreeningsFromKycProfile: async (parentId: string,childIds: string[]): Promise<KycProfile> => {
            const response = await this.http.put(`/KycProfile/removeFomScreenings/${parentId}/`,
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

        assignKycProfileToIdentityDocument: async (id: string, kycProfileId: string): Promise<IdentityDocument> => {
            const response = await this.http.put(`/IdentityDocument/assignKycProfileToIdentityDocument/${id}`,
                {
                    id: kycProfileId
                }
            );
            return response.data;
        },

        unassignKycProfileFromIdentityDocument: async (id: string ): Promise<IdentityDocument> => {
            const response = await this.http.delete(`/IdentityDocument/unassignKycProfileFromIdentityDocument/${id}`);
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

        assignKycProfileToRiskAssessment: async (id: string, kycProfileId: string): Promise<RiskAssessment> => {
            const response = await this.http.put(`/RiskAssessment/assignKycProfileToRiskAssessment/${id}`,
                {
                    id: kycProfileId
                }
            );
            return response.data;
        },

        unassignKycProfileFromRiskAssessment: async (id: string ): Promise<RiskAssessment> => {
            const response = await this.http.delete(`/RiskAssessment/unassignKycProfileFromRiskAssessment/${id}`);
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

        assignKycProfileToScreeningResult: async (id: string, kycProfileId: string): Promise<ScreeningResult> => {
            const response = await this.http.put(`/ScreeningResult/assignKycProfileToScreeningResult/${id}`,
                {
                    id: kycProfileId
                }
            );
            return response.data;
        },

        unassignKycProfileFromScreeningResult: async (id: string ): Promise<ScreeningResult> => {
            const response = await this.http.delete(`/ScreeningResult/unassignKycProfileFromScreeningResult/${id}`);
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

        assignBankToBankingProduct: async (id: string, bankId: string): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/assignBankToBankingProduct/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBankFromBankingProduct: async (id: string ): Promise<BankingProduct> => {
            const response = await this.http.delete(`/BankingProduct/unassignBankFromBankingProduct/${id}`);
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

        addAccountsToBankingProduct: async (parentId: string,input: Account): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/addAccountsToBankingProduct/${parentId}/`,input);
            return response.data;
        },

        removeAccountsFromBankingProduct: async (parentId: string,childIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/removeFomAccounts/${parentId}/`,
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

        addLoanAccountsToBankingProduct: async (parentId: string,input: LoanAccount): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/addLoanAccountsToBankingProduct/${parentId}/`,input);
            return response.data;
        },

        removeLoanAccountsFromBankingProduct: async (parentId: string,childIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/removeFomLoanAccounts/${parentId}/`,
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

        addPaymentCardsToBankingProduct: async (parentId: string,input: PaymentCard): Promise<BankingProduct> => {
            const response = await this.http.post(`/BankingProduct/addPaymentCardsToBankingProduct/${parentId}/`,input);
            return response.data;
        },

        removePaymentCardsFromBankingProduct: async (parentId: string,childIds: string[]): Promise<BankingProduct> => {
            const response = await this.http.put(`/BankingProduct/removeFomPaymentCards/${parentId}/`,
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

        assignBankToAccount: async (id: string, bankId: string): Promise<Account> => {
            const response = await this.http.put(`/Account/assignBankToAccount/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBankFromAccount: async (id: string ): Promise<Account> => {
            const response = await this.http.delete(`/Account/unassignBankFromAccount/${id}`);
            return response.data;
        },


        branch: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/Account/branch/${id}`);
            return response.data;
        },

        assignBranchToAccount: async (id: string, branchId: string): Promise<Account> => {
            const response = await this.http.put(`/Account/assignBranchToAccount/${id}`,
                {
                    id: branchId
                }
            );
            return response.data;
        },

        unassignBranchFromAccount: async (id: string ): Promise<Account> => {
            const response = await this.http.delete(`/Account/unassignBranchFromAccount/${id}`);
            return response.data;
        },


        product: async (id: string): Promise<BankingProduct | null> => {
            const response = await this.http.get(`/Account/product/${id}`);
            return response.data;
        },

        assignProductToAccount: async (id: string, productId: string): Promise<Account> => {
            const response = await this.http.put(`/Account/assignProductToAccount/${id}`,
                {
                    id: productId
                }
            );
            return response.data;
        },

        unassignProductFromAccount: async (id: string ): Promise<Account> => {
            const response = await this.http.delete(`/Account/unassignProductFromAccount/${id}`);
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

        addOwnersToAccount: async (parentId: string,input: Customer): Promise<Account> => {
            const response = await this.http.post(`/Account/addOwnersToAccount/${parentId}/`,input);
            return response.data;
        },

        removeOwnersFromAccount: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/removeFomOwners/${parentId}/`,
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

        addTransactionsToAccount: async (parentId: string,input: Transaction): Promise<Account> => {
            const response = await this.http.post(`/Account/addTransactionsToAccount/${parentId}/`,input);
            return response.data;
        },

        removeTransactionsFromAccount: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/removeFomTransactions/${parentId}/`,
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

        addStatementsToAccount: async (parentId: string,input: AccountStatement): Promise<Account> => {
            const response = await this.http.post(`/Account/addStatementsToAccount/${parentId}/`,input);
            return response.data;
        },

        removeStatementsFromAccount: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/removeFomStatements/${parentId}/`,
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

        addStandingInstructionsToAccount: async (parentId: string,input: StandingInstruction): Promise<Account> => {
            const response = await this.http.post(`/Account/addStandingInstructionsToAccount/${parentId}/`,input);
            return response.data;
        },

        removeStandingInstructionsFromAccount: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/removeFomStandingInstructions/${parentId}/`,
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

        addFeeChargesToAccount: async (parentId: string,input: FeeCharge): Promise<Account> => {
            const response = await this.http.post(`/Account/addFeeChargesToAccount/${parentId}/`,input);
            return response.data;
        },

        removeFeeChargesFromAccount: async (parentId: string,childIds: string[]): Promise<Account> => {
            const response = await this.http.put(`/Account/removeFomFeeCharges/${parentId}/`,
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

        assignAccountToAccountStatement: async (id: string, accountId: string): Promise<AccountStatement> => {
            const response = await this.http.put(`/AccountStatement/assignAccountToAccountStatement/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccountFromAccountStatement: async (id: string ): Promise<AccountStatement> => {
            const response = await this.http.delete(`/AccountStatement/unassignAccountFromAccountStatement/${id}`);
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

        assignAccountToTransaction: async (id: string, accountId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignAccountToTransaction/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccountFromTransaction: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignAccountFromTransaction/${id}`);
            return response.data;
        },


        externalCounterparty: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/Transaction/externalCounterparty/${id}`);
            return response.data;
        },

        assignExternalCounterpartyToTransaction: async (id: string, externalCounterpartyId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignExternalCounterpartyToTransaction/${id}`,
                {
                    id: externalCounterpartyId
                }
            );
            return response.data;
        },

        unassignExternalCounterpartyFromTransaction: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignExternalCounterpartyFromTransaction/${id}`);
            return response.data;
        },


        paymentCard: async (id: string): Promise<PaymentCard | null> => {
            const response = await this.http.get(`/Transaction/paymentCard/${id}`);
            return response.data;
        },

        assignPaymentCardToTransaction: async (id: string, paymentCardId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignPaymentCardToTransaction/${id}`,
                {
                    id: paymentCardId
                }
            );
            return response.data;
        },

        unassignPaymentCardFromTransaction: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignPaymentCardFromTransaction/${id}`);
            return response.data;
        },


        fundsTransfer: async (id: string): Promise<FundsTransfer | null> => {
            const response = await this.http.get(`/Transaction/fundsTransfer/${id}`);
            return response.data;
        },

        assignFundsTransferToTransaction: async (id: string, fundsTransferId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignFundsTransferToTransaction/${id}`,
                {
                    id: fundsTransferId
                }
            );
            return response.data;
        },

        unassignFundsTransferFromTransaction: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignFundsTransferFromTransaction/${id}`);
            return response.data;
        },


        fxTrade: async (id: string): Promise<FXTrade | null> => {
            const response = await this.http.get(`/Transaction/fxTrade/${id}`);
            return response.data;
        },

        assignFxTradeToTransaction: async (id: string, fxTradeId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignFxTradeToTransaction/${id}`,
                {
                    id: fxTradeId
                }
            );
            return response.data;
        },

        unassignFxTradeFromTransaction: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignFxTradeFromTransaction/${id}`);
            return response.data;
        },


        dispute: async (id: string): Promise<Dispute | null> => {
            const response = await this.http.get(`/Transaction/dispute/${id}`);
            return response.data;
        },

        assignDisputeToTransaction: async (id: string, disputeId: string): Promise<Transaction> => {
            const response = await this.http.put(`/Transaction/assignDisputeToTransaction/${id}`,
                {
                    id: disputeId
                }
            );
            return response.data;
        },

        unassignDisputeFromTransaction: async (id: string ): Promise<Transaction> => {
            const response = await this.http.delete(`/Transaction/unassignDisputeFromTransaction/${id}`);
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

        assignCustomerToExternalAccount: async (id: string, customerId: string): Promise<ExternalAccount> => {
            const response = await this.http.put(`/ExternalAccount/assignCustomerToExternalAccount/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomerFromExternalAccount: async (id: string ): Promise<ExternalAccount> => {
            const response = await this.http.delete(`/ExternalAccount/unassignCustomerFromExternalAccount/${id}`);
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

        addTransactionsToExternalAccount: async (parentId: string,input: Transaction): Promise<ExternalAccount> => {
            const response = await this.http.post(`/ExternalAccount/addTransactionsToExternalAccount/${parentId}/`,input);
            return response.data;
        },

        removeTransactionsFromExternalAccount: async (parentId: string,childIds: string[]): Promise<ExternalAccount> => {
            const response = await this.http.put(`/ExternalAccount/removeFomTransactions/${parentId}/`,
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

        assignSourceAccountToFundsTransfer: async (id: string, sourceAccountId: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/assignSourceAccountToFundsTransfer/${id}`,
                {
                    id: sourceAccountId
                }
            );
            return response.data;
        },

        unassignSourceAccountFromFundsTransfer: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer/unassignSourceAccountFromFundsTransfer/${id}`);
            return response.data;
        },


        destinationAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FundsTransfer/destinationAccount/${id}`);
            return response.data;
        },

        assignDestinationAccountToFundsTransfer: async (id: string, destinationAccountId: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/assignDestinationAccountToFundsTransfer/${id}`,
                {
                    id: destinationAccountId
                }
            );
            return response.data;
        },

        unassignDestinationAccountFromFundsTransfer: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer/unassignDestinationAccountFromFundsTransfer/${id}`);
            return response.data;
        },


        externalBeneficiary: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/FundsTransfer/externalBeneficiary/${id}`);
            return response.data;
        },

        assignExternalBeneficiaryToFundsTransfer: async (id: string, externalBeneficiaryId: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/assignExternalBeneficiaryToFundsTransfer/${id}`,
                {
                    id: externalBeneficiaryId
                }
            );
            return response.data;
        },

        unassignExternalBeneficiaryFromFundsTransfer: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer/unassignExternalBeneficiaryFromFundsTransfer/${id}`);
            return response.data;
        },


        initiatedBy: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/FundsTransfer/initiatedBy/${id}`);
            return response.data;
        },

        assignInitiatedByToFundsTransfer: async (id: string, initiatedById: string): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/assignInitiatedByToFundsTransfer/${id}`,
                {
                    id: initiatedById
                }
            );
            return response.data;
        },

        unassignInitiatedByFromFundsTransfer: async (id: string ): Promise<FundsTransfer> => {
            const response = await this.http.delete(`/FundsTransfer/unassignInitiatedByFromFundsTransfer/${id}`);
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

        addTransactionsToFundsTransfer: async (parentId: string,input: Transaction): Promise<FundsTransfer> => {
            const response = await this.http.post(`/FundsTransfer/addTransactionsToFundsTransfer/${parentId}/`,input);
            return response.data;
        },

        removeTransactionsFromFundsTransfer: async (parentId: string,childIds: string[]): Promise<FundsTransfer> => {
            const response = await this.http.put(`/FundsTransfer/removeFomTransactions/${parentId}/`,
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

        assignAccountToStandingInstruction: async (id: string, accountId: string): Promise<StandingInstruction> => {
            const response = await this.http.put(`/StandingInstruction/assignAccountToStandingInstruction/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccountFromStandingInstruction: async (id: string ): Promise<StandingInstruction> => {
            const response = await this.http.delete(`/StandingInstruction/unassignAccountFromStandingInstruction/${id}`);
            return response.data;
        },


        beneficiary: async (id: string): Promise<ExternalAccount | null> => {
            const response = await this.http.get(`/StandingInstruction/beneficiary/${id}`);
            return response.data;
        },

        assignBeneficiaryToStandingInstruction: async (id: string, beneficiaryId: string): Promise<StandingInstruction> => {
            const response = await this.http.put(`/StandingInstruction/assignBeneficiaryToStandingInstruction/${id}`,
                {
                    id: beneficiaryId
                }
            );
            return response.data;
        },

        unassignBeneficiaryFromStandingInstruction: async (id: string ): Promise<StandingInstruction> => {
            const response = await this.http.delete(`/StandingInstruction/unassignBeneficiaryFromStandingInstruction/${id}`);
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

        assignBankToPaymentCard: async (id: string, bankId: string): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/assignBankToPaymentCard/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBankFromPaymentCard: async (id: string ): Promise<PaymentCard> => {
            const response = await this.http.delete(`/PaymentCard/unassignBankFromPaymentCard/${id}`);
            return response.data;
        },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/PaymentCard/account/${id}`);
            return response.data;
        },

        assignAccountToPaymentCard: async (id: string, accountId: string): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/assignAccountToPaymentCard/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccountFromPaymentCard: async (id: string ): Promise<PaymentCard> => {
            const response = await this.http.delete(`/PaymentCard/unassignAccountFromPaymentCard/${id}`);
            return response.data;
        },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/PaymentCard/customer/${id}`);
            return response.data;
        },

        assignCustomerToPaymentCard: async (id: string, customerId: string): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/assignCustomerToPaymentCard/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomerFromPaymentCard: async (id: string ): Promise<PaymentCard> => {
            const response = await this.http.delete(`/PaymentCard/unassignCustomerFromPaymentCard/${id}`);
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

        addTransactionsToPaymentCard: async (parentId: string,input: Transaction): Promise<PaymentCard> => {
            const response = await this.http.post(`/PaymentCard/addTransactionsToPaymentCard/${parentId}/`,input);
            return response.data;
        },

        removeTransactionsFromPaymentCard: async (parentId: string,childIds: string[]): Promise<PaymentCard> => {
            const response = await this.http.put(`/PaymentCard/removeFomTransactions/${parentId}/`,
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

        assignBankToLoanAccount: async (id: string, bankId: string): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/assignBankToLoanAccount/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBankFromLoanAccount: async (id: string ): Promise<LoanAccount> => {
            const response = await this.http.delete(`/LoanAccount/unassignBankFromLoanAccount/${id}`);
            return response.data;
        },


        branch: async (id: string): Promise<Branch | null> => {
            const response = await this.http.get(`/LoanAccount/branch/${id}`);
            return response.data;
        },

        assignBranchToLoanAccount: async (id: string, branchId: string): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/assignBranchToLoanAccount/${id}`,
                {
                    id: branchId
                }
            );
            return response.data;
        },

        unassignBranchFromLoanAccount: async (id: string ): Promise<LoanAccount> => {
            const response = await this.http.delete(`/LoanAccount/unassignBranchFromLoanAccount/${id}`);
            return response.data;
        },


        product: async (id: string): Promise<BankingProduct | null> => {
            const response = await this.http.get(`/LoanAccount/product/${id}`);
            return response.data;
        },

        assignProductToLoanAccount: async (id: string, productId: string): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/assignProductToLoanAccount/${id}`,
                {
                    id: productId
                }
            );
            return response.data;
        },

        unassignProductFromLoanAccount: async (id: string ): Promise<LoanAccount> => {
            const response = await this.http.delete(`/LoanAccount/unassignProductFromLoanAccount/${id}`);
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

        addBorrowersToLoanAccount: async (parentId: string,input: Customer): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/addBorrowersToLoanAccount/${parentId}/`,input);
            return response.data;
        },

        removeBorrowersFromLoanAccount: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/removeFomBorrowers/${parentId}/`,
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

        addRepaymentScheduleToLoanAccount: async (parentId: string,input: RepaymentSchedule): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/addRepaymentScheduleToLoanAccount/${parentId}/`,input);
            return response.data;
        },

        removeRepaymentScheduleFromLoanAccount: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/removeFomRepaymentSchedule/${parentId}/`,
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

        addPaymentsToLoanAccount: async (parentId: string,input: LoanPayment): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/addPaymentsToLoanAccount/${parentId}/`,input);
            return response.data;
        },

        removePaymentsFromLoanAccount: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/removeFomPayments/${parentId}/`,
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

        addCollateralToLoanAccount: async (parentId: string,input: Collateral): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/addCollateralToLoanAccount/${parentId}/`,input);
            return response.data;
        },

        removeCollateralFromLoanAccount: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/removeFomCollateral/${parentId}/`,
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

        addFeeChargesToLoanAccount: async (parentId: string,input: FeeCharge): Promise<LoanAccount> => {
            const response = await this.http.post(`/LoanAccount/addFeeChargesToLoanAccount/${parentId}/`,input);
            return response.data;
        },

        removeFeeChargesFromLoanAccount: async (parentId: string,childIds: string[]): Promise<LoanAccount> => {
            const response = await this.http.put(`/LoanAccount/removeFomFeeCharges/${parentId}/`,
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

        assignLoanAccountToRepaymentSchedule: async (id: string, loanAccountId: string): Promise<RepaymentSchedule> => {
            const response = await this.http.put(`/RepaymentSchedule/assignLoanAccountToRepaymentSchedule/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccountFromRepaymentSchedule: async (id: string ): Promise<RepaymentSchedule> => {
            const response = await this.http.delete(`/RepaymentSchedule/unassignLoanAccountFromRepaymentSchedule/${id}`);
            return response.data;
        },


        payment: async (id: string): Promise<LoanPayment | null> => {
            const response = await this.http.get(`/RepaymentSchedule/payment/${id}`);
            return response.data;
        },

        assignPaymentToRepaymentSchedule: async (id: string, paymentId: string): Promise<RepaymentSchedule> => {
            const response = await this.http.put(`/RepaymentSchedule/assignPaymentToRepaymentSchedule/${id}`,
                {
                    id: paymentId
                }
            );
            return response.data;
        },

        unassignPaymentFromRepaymentSchedule: async (id: string ): Promise<RepaymentSchedule> => {
            const response = await this.http.delete(`/RepaymentSchedule/unassignPaymentFromRepaymentSchedule/${id}`);
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

        assignLoanAccountToLoanPayment: async (id: string, loanAccountId: string): Promise<LoanPayment> => {
            const response = await this.http.put(`/LoanPayment/assignLoanAccountToLoanPayment/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccountFromLoanPayment: async (id: string ): Promise<LoanPayment> => {
            const response = await this.http.delete(`/LoanPayment/unassignLoanAccountFromLoanPayment/${id}`);
            return response.data;
        },


        transaction: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/LoanPayment/transaction/${id}`);
            return response.data;
        },

        assignTransactionToLoanPayment: async (id: string, transactionId: string): Promise<LoanPayment> => {
            const response = await this.http.put(`/LoanPayment/assignTransactionToLoanPayment/${id}`,
                {
                    id: transactionId
                }
            );
            return response.data;
        },

        unassignTransactionFromLoanPayment: async (id: string ): Promise<LoanPayment> => {
            const response = await this.http.delete(`/LoanPayment/unassignTransactionFromLoanPayment/${id}`);
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

        assignLoanAccountToCollateral: async (id: string, loanAccountId: string): Promise<Collateral> => {
            const response = await this.http.put(`/Collateral/assignLoanAccountToCollateral/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccountFromCollateral: async (id: string ): Promise<Collateral> => {
            const response = await this.http.delete(`/Collateral/unassignLoanAccountFromCollateral/${id}`);
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

        assignAccountToFeeCharge: async (id: string, accountId: string): Promise<FeeCharge> => {
            const response = await this.http.put(`/FeeCharge/assignAccountToFeeCharge/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccountFromFeeCharge: async (id: string ): Promise<FeeCharge> => {
            const response = await this.http.delete(`/FeeCharge/unassignAccountFromFeeCharge/${id}`);
            return response.data;
        },


        loanAccount: async (id: string): Promise<LoanAccount | null> => {
            const response = await this.http.get(`/FeeCharge/loanAccount/${id}`);
            return response.data;
        },

        assignLoanAccountToFeeCharge: async (id: string, loanAccountId: string): Promise<FeeCharge> => {
            const response = await this.http.put(`/FeeCharge/assignLoanAccountToFeeCharge/${id}`,
                {
                    id: loanAccountId
                }
            );
            return response.data;
        },

        unassignLoanAccountFromFeeCharge: async (id: string ): Promise<FeeCharge> => {
            const response = await this.http.delete(`/FeeCharge/unassignLoanAccountFromFeeCharge/${id}`);
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

        assignBankToExchangeRate: async (id: string, bankId: string): Promise<ExchangeRate> => {
            const response = await this.http.put(`/ExchangeRate/assignBankToExchangeRate/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBankFromExchangeRate: async (id: string ): Promise<ExchangeRate> => {
            const response = await this.http.delete(`/ExchangeRate/unassignBankFromExchangeRate/${id}`);
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

        addFxTradesToExchangeRate: async (parentId: string,input: FXTrade): Promise<ExchangeRate> => {
            const response = await this.http.post(`/ExchangeRate/addFxTradesToExchangeRate/${parentId}/`,input);
            return response.data;
        },

        removeFxTradesFromExchangeRate: async (parentId: string,childIds: string[]): Promise<ExchangeRate> => {
            const response = await this.http.put(`/ExchangeRate/removeFomFxTrades/${parentId}/`,
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

        assignCustomerToFXTrade: async (id: string, customerId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignCustomerToFXTrade/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomerFromFXTrade: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignCustomerFromFXTrade/${id}`);
            return response.data;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/FXTrade/bank/${id}`);
            return response.data;
        },

        assignBankToFXTrade: async (id: string, bankId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignBankToFXTrade/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBankFromFXTrade: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignBankFromFXTrade/${id}`);
            return response.data;
        },


        exchangeRate: async (id: string): Promise<ExchangeRate | null> => {
            const response = await this.http.get(`/FXTrade/exchangeRate/${id}`);
            return response.data;
        },

        assignExchangeRateToFXTrade: async (id: string, exchangeRateId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignExchangeRateToFXTrade/${id}`,
                {
                    id: exchangeRateId
                }
            );
            return response.data;
        },

        unassignExchangeRateFromFXTrade: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignExchangeRateFromFXTrade/${id}`);
            return response.data;
        },


        sourceAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FXTrade/sourceAccount/${id}`);
            return response.data;
        },

        assignSourceAccountToFXTrade: async (id: string, sourceAccountId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignSourceAccountToFXTrade/${id}`,
                {
                    id: sourceAccountId
                }
            );
            return response.data;
        },

        unassignSourceAccountFromFXTrade: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignSourceAccountFromFXTrade/${id}`);
            return response.data;
        },


        destinationAccount: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/FXTrade/destinationAccount/${id}`);
            return response.data;
        },

        assignDestinationAccountToFXTrade: async (id: string, destinationAccountId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignDestinationAccountToFXTrade/${id}`,
                {
                    id: destinationAccountId
                }
            );
            return response.data;
        },

        unassignDestinationAccountFromFXTrade: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignDestinationAccountFromFXTrade/${id}`);
            return response.data;
        },


        transaction: async (id: string): Promise<Transaction | null> => {
            const response = await this.http.get(`/FXTrade/transaction/${id}`);
            return response.data;
        },

        assignTransactionToFXTrade: async (id: string, transactionId: string): Promise<FXTrade> => {
            const response = await this.http.put(`/FXTrade/assignTransactionToFXTrade/${id}`,
                {
                    id: transactionId
                }
            );
            return response.data;
        },

        unassignTransactionFromFXTrade: async (id: string ): Promise<FXTrade> => {
            const response = await this.http.delete(`/FXTrade/unassignTransactionFromFXTrade/${id}`);
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

        assignTransactionToDispute: async (id: string, transactionId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/assignTransactionToDispute/${id}`,
                {
                    id: transactionId
                }
            );
            return response.data;
        },

        unassignTransactionFromDispute: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute/unassignTransactionFromDispute/${id}`);
            return response.data;
        },


        customer: async (id: string): Promise<Customer | null> => {
            const response = await this.http.get(`/Dispute/customer/${id}`);
            return response.data;
        },

        assignCustomerToDispute: async (id: string, customerId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/assignCustomerToDispute/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomerFromDispute: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute/unassignCustomerFromDispute/${id}`);
            return response.data;
        },


        account: async (id: string): Promise<Account | null> => {
            const response = await this.http.get(`/Dispute/account/${id}`);
            return response.data;
        },

        assignAccountToDispute: async (id: string, accountId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/assignAccountToDispute/${id}`,
                {
                    id: accountId
                }
            );
            return response.data;
        },

        unassignAccountFromDispute: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute/unassignAccountFromDispute/${id}`);
            return response.data;
        },


        paymentCard: async (id: string): Promise<PaymentCard | null> => {
            const response = await this.http.get(`/Dispute/paymentCard/${id}`);
            return response.data;
        },

        assignPaymentCardToDispute: async (id: string, paymentCardId: string): Promise<Dispute> => {
            const response = await this.http.put(`/Dispute/assignPaymentCardToDispute/${id}`,
                {
                    id: paymentCardId
                }
            );
            return response.data;
        },

        unassignPaymentCardFromDispute: async (id: string ): Promise<Dispute> => {
            const response = await this.http.delete(`/Dispute/unassignPaymentCardFromDispute/${id}`);
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

        assignCustomerToConsent: async (id: string, customerId: string): Promise<Consent> => {
            const response = await this.http.put(`/Consent/assignCustomerToConsent/${id}`,
                {
                    id: customerId
                }
            );
            return response.data;
        },

        unassignCustomerFromConsent: async (id: string ): Promise<Consent> => {
            const response = await this.http.delete(`/Consent/unassignCustomerFromConsent/${id}`);
            return response.data;
        },


        bank: async (id: string): Promise<Bank | null> => {
            const response = await this.http.get(`/Consent/bank/${id}`);
            return response.data;
        },

        assignBankToConsent: async (id: string, bankId: string): Promise<Consent> => {
            const response = await this.http.put(`/Consent/assignBankToConsent/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBankFromConsent: async (id: string ): Promise<Consent> => {
            const response = await this.http.delete(`/Consent/unassignBankFromConsent/${id}`);
            return response.data;
        },


        thirdPartyProvider: async (id: string): Promise<ThirdPartyProvider | null> => {
            const response = await this.http.get(`/Consent/thirdPartyProvider/${id}`);
            return response.data;
        },

        assignThirdPartyProviderToConsent: async (id: string, thirdPartyProviderId: string): Promise<Consent> => {
            const response = await this.http.put(`/Consent/assignThirdPartyProviderToConsent/${id}`,
                {
                    id: thirdPartyProviderId
                }
            );
            return response.data;
        },

        unassignThirdPartyProviderFromConsent: async (id: string ): Promise<Consent> => {
            const response = await this.http.delete(`/Consent/unassignThirdPartyProviderFromConsent/${id}`);
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

        addAuthorizedAccountsToConsent: async (parentId: string,input: Account): Promise<Consent> => {
            const response = await this.http.post(`/Consent/addAuthorizedAccountsToConsent/${parentId}/`,input);
            return response.data;
        },

        removeAuthorizedAccountsFromConsent: async (parentId: string,childIds: string[]): Promise<Consent> => {
            const response = await this.http.put(`/Consent/removeFomAuthorizedAccounts/${parentId}/`,
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

        assignBankToThirdPartyProvider: async (id: string, bankId: string): Promise<ThirdPartyProvider> => {
            const response = await this.http.put(`/ThirdPartyProvider/assignBankToThirdPartyProvider/${id}`,
                {
                    id: bankId
                }
            );
            return response.data;
        },

        unassignBankFromThirdPartyProvider: async (id: string ): Promise<ThirdPartyProvider> => {
            const response = await this.http.delete(`/ThirdPartyProvider/unassignBankFromThirdPartyProvider/${id}`);
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

        addConsentsToThirdPartyProvider: async (parentId: string,input: Consent): Promise<ThirdPartyProvider> => {
            const response = await this.http.post(`/ThirdPartyProvider/addConsentsToThirdPartyProvider/${parentId}/`,input);
            return response.data;
        },

        removeConsentsFromThirdPartyProvider: async (parentId: string,childIds: string[]): Promise<ThirdPartyProvider> => {
            const response = await this.http.put(`/ThirdPartyProvider/removeFomConsents/${parentId}/`,
                {
                    ids: childIds
                }
            );
            return response.data;
        },


};

}