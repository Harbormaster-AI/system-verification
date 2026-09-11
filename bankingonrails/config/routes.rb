Rails.application.routes.draw do
  root "welcome#welcomeindex"
  root "application#health"
  resources :banks do
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
  end
  resources :branchs do
    resource :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
  end
  resources :atms do
    resource :${roleName}
  end
  resources :customers do
    resource :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
  end
  resources :kycprofiles do
    resource :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
  end
  resources :identitydocuments do
    resource :${roleName}
  end
  resources :riskassessments do
    resource :${roleName}
  end
  resources :screeningresults do
    resource :${roleName}
  end
  resources :bankingproducts do
    resource :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
  end
  resources :accounts do
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
  end
  resources :accountstatements do
    resource :${roleName}
  end
  resources :transactions do
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
  end
  resources :externalaccounts do
    resource :${roleName}
    resources :${roleName}
  end
  resources :fundstransfers do
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resources :${roleName}
  end
  resources :standinginstructions do
    resource :${roleName}
    resource :${roleName}
  end
  resources :paymentcards do
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resources :${roleName}
  end
  resources :loanaccounts do
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
    resources :${roleName}
  end
  resources :repaymentschedules do
    resource :${roleName}
    resource :${roleName}
  end
  resources :loanpayments do
    resource :${roleName}
    resource :${roleName}
  end
  resources :collaterals do
    resource :${roleName}
  end
  resources :feecharges do
    resource :${roleName}
    resource :${roleName}
  end
  resources :exchangerates do
    resource :${roleName}
    resources :${roleName}
  end
  resources :fxtrades do
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
  end
  resources :disputes do
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
    resource :${roleName}
  end
  resources :consents do
    resource :${roleName}
    resource :${roleName}
    resources :${roleName}
    resource :${roleName}
  end
  resources :thirdpartyproviders do
    resource :${roleName}
    resources :${roleName}
  end
end
