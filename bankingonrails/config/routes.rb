Rails.application.routes.draw do
  root "welcome#welcomeindex"
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
  resources :atms do
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
  resources :kycprofiles do
    resource :customer
    resources :identitydocuments
    resources :riskassessments
    resources :screenings
  end
  resources :identitydocuments do
    resource :kycprofile
  end
  resources :riskassessments do
    resource :kycprofile
  end
  resources :screeningresults do
    resource :kycprofile
  end
  resources :bankingproducts do
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
  resources :accountstatements do
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
  resources :externalaccounts do
    resource :customer
    resources :transactions
  end
  resources :fundstransfers do
    resource :sourceaccount
    resource :destinationaccount
    resource :externalbeneficiary
    resource :initiatedby
    resources :transactions
  end
  resources :standinginstructions do
    resource :account
    resource :beneficiary
  end
  resources :paymentcards do
    resource :bank
    resource :account
    resource :customer
    resources :transactions
  end
  resources :loanaccounts do
    resource :bank
    resource :branch
    resource :product
    resources :borrowers
    resources :repaymentschedule
    resources :payments
    resources :collateral
    resources :feecharges
  end
  resources :repaymentschedules do
    resource :loanaccount
    resource :payment
  end
  resources :loanpayments do
    resource :loanaccount
    resource :transaction
  end
  resources :collaterals do
    resource :loanaccount
  end
  resources :feecharges do
    resource :account
    resource :loanaccount
  end
  resources :exchangerates do
    resource :bank
    resources :fxtrades
  end
  resources :fxtrades do
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
  resources :thirdpartyproviders do
    resource :bank
    resources :consents
  end
end
