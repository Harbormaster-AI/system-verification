class Registration < ApplicationRecord


  composed_of :tail_number,
    class_name: "TailNumber",
    mapping: [
      %w[tail_number_value value], 
      %w[tail_number_country country]
    ]

  has_many :Aircraft, class_name: 'Aircraft'

end

