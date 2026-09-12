require_relative 'lib/rubydemo/version'

Gem::Specification.new do |spec|
  spec.name          = 'bankingonrails'
  spec.version       = '0.0.1'
  spec.authors       = ["Harbormaster Dev Team"]
  spec.email         = ["xxxx.xxxxxxxxx@xxxxxxxx.com"]
  spec.summary       = %q{Banking System}
  spec.homepage      = "https://put-your-home-page-here.com"
  spec.license       = "MIT"
  spec.required_ruby_version = Gem::Requirement.new(">= 3.4.5")

  spec.metadata["allowed_push_host"] = "http://mygemserver.com"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://https://github.com//banking-on-rails.git"
  spec.metadata["changelog_uri"] = "https://https://github.com//banking-on-rails/blob/master/CHANGELOG.md"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files         = Dir.chdir(File.expand_path('..', __FILE__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = "bin"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]
end
