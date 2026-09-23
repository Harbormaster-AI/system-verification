Rails.application.routes.draw do
  root "application#health"

  resources :_banks do

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
  resources :_branchs do

    resource :bank
    resources :accounts
    resources :loanaccounts
    resources :atms
  end
  resources :_a_t_ms do

    resource :branch
  end
  resources :_customers do

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
  resources :_kyc_profiles do

    resource :customer
    resources :identitydocuments
    resources :riskassessments
    resources :screenings
  end
  resources :_identity_documents do

    resource :kycprofile
  end
  resources :_risk_assessments do

    resource :kycprofile
  end
  resources :_screening_results do

    resource :kycprofile
  end
  resources :_banking_products do

    resource :bank
    resources :accounts
    resources :loanaccounts
    resources :paymentcards
  end
  resources :_accounts do

    resource :bank
    resource :branch
    resource :product
    resources :owners
    resources :transactions
    resources :statements
    resources :standinginstructions
    resources :feecharges
  end
  resources :_account_statements do

    resource :account
  end
  resources :_transactions do

    resource :account
    resource :externalcounterparty
    resource :paymentcard
    resource :fundstransfer
    resource :fxtrade
    resource :dispute
  end
  resources :_external_accounts do

    resource :customer
    resources :transactions
  end
  resources :_funds_transfers do

    resource :sourceaccount
    resource :destinationaccount
    resource :externalbeneficiary
    resource :initiatedby
    resources :transactions
  end
  resources :_standing_instructions do

    resource :account
    resource :beneficiary
  end
  resources :_payment_cards do

    resource :bank
    resource :account
    resource :customer
    resources :transactions
  end
  resources :_loan_accounts do

    resource :bank
    resource :branch
    resource :product
    resources :borrowers
    resources :repaymentschedule
    resources :payments
    resources :collateral
    resources :feecharges
  end
  resources :_repayment_schedules do

    resource :loanaccount
    resource :payment
  end
  resources :_loan_payments do

    resource :loanaccount
    resource :transaction
  end
  resources :_collaterals do

    resource :loanaccount
  end
  resources :_fee_charges do

    resource :account
    resource :loanaccount
  end
  resources :_exchange_rates do

    resource :bank
    resources :fxtrades
  end
  resources :_f_x_trades do

    resource :customer
    resource :bank
    resource :exchangerate
    resource :sourceaccount
    resource :destinationaccount
    resource :transaction
  end
  resources :_disputes do

    resource :transaction
    resource :customer
    resource :account
    resource :paymentcard
  end
  resources :_consents do

    resource :customer
    resource :bank
    resources :authorizedaccounts
    resource :thirdpartyprovider
  end
  resources :_third_party_providers do

    resource :bank
    resources :consents
  end
end
