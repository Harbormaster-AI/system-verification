require_relative 'lib/rubydemo/version'

Gem::Specification.new do |spec|
  spec.name          = 'demo'
  spec.version       = '1.0.0'
  spec.authors       = ["your_name_here"]
  spec.email         = ["put_your_email_here@xyz.com"]
  spec.summary       = %q{a demonstration app}
  spec.homepage      = "https://put-your-home-page-here.com"
  spec.license       = "MIT"
  spec.required_ruby_version = Gem::Requirement.new(">= 3.4.12")

  spec.metadata["allowed_push_host"] = "http://mygemserver.com"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https:////.git"
  spec.metadata["changelog_uri"] = "https://///blob/master/CHANGELOG.md"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files         = Dir.chdir(File.expand_path('..', __FILE__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = "bin"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]
end
