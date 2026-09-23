Rails.application.routes.draw do
  root "application#health"

  resources :banks do
    resources :branches
    resources :products
    resources :customers
    resources :accounts
    resources :paymentcards
    resources :loanaccounts
    resources :exchangerates
    resources :consents
    resources :thirdpartyproviders
  end
  resources :branchs do
    resource :bank
    resources :accounts
    resources :loanaccounts
    resources :atms
  end
  resources :a_t_ms do
    resource :branch
  end
  resources :customers do
    resource :bank
    resources :accounts
    resources :loanaccounts
    resources :paymentcards
    resources :externalaccounts
    resources :fundstransfers
    resources :disputes
    resources :kycprofiles
    resources :consents
  end
  resources :kyc_profiles do
    resource :customer
    resources :identitydocuments
    resources :riskassessments
    resources :screenings
  end
  resources :identity_documents do
    resource :kycprofile
  end
  resources :risk_assessments do
    resource :kycprofile
  end
  resources :screening_results do
    resource :kycprofile
  end
  resources :banking_products do
    resource :bank
    resources :accounts
    resources :loanaccounts
    resources :paymentcards
  end
  resources :accounts do
    resource :bank
    resource :branch
    resource :product
    resources :owners
    resources :transactions
    resources :statements
    resources :standinginstructions
    resources :feecharges
  end
  resources :account_statements do
    resource :account
  end
  resources :transactions do
    resource :account
    resource :externalcounterparty
    resource :paymentcard
    resource :fundstransfer
    resource :fxtrade
    resource :dispute
  end
  resources :external_accounts do
    resource :customer
    resources :transactions
  end
  resources :funds_transfers do
    resource :sourceaccount
    resource :destinationaccount
    resource :externalbeneficiary
    resource :initiatedby
    resources :transactions
  end
  resources :standing_instructions do
    resource :account
    resource :beneficiary
  end
  resources :payment_cards do
    resource :bank
    resource :account
    resource :customer
    resources :transactions
  end
  resources :loan_accounts do
    resource :bank
    resource :branch
    resource :product
    resources :borrowers
    resources :repaymentschedule
    resources :payments
    resources :collateral
    resources :feecharges
  end
  resources :repayment_schedules do
    resource :loanaccount
    resource :payment
  end
  resources :loan_payments do
    resource :loanaccount
    resource :transaction
  end
  resources :collaterals do
    resource :loanaccount
  end
  resources :fee_charges do
    resource :account
    resource :loanaccount
  end
  resources :exchange_rates do
    resource :bank
    resources :fxtrades
  end
  resources :f_x_trades do
    resource :customer
    resource :bank
    resource :exchangerate
    resource :sourceaccount
    resource :destinationaccount
    resource :transaction
  end
  resources :disputes do
    resource :transaction
    resource :customer
    resource :account
    resource :paymentcard
  end
  resources :consents do
    resource :customer
    resource :bank
    resources :authorizedaccounts
    resource :thirdpartyprovider
  end
  resources :third_party_providers do
    resource :bank
    resources :consents
  end
end
