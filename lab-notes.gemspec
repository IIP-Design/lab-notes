# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "lab-notes"
  spec.version       = "0.4.0"
  spec.authors       = ["Marek Rewers, U.S. Department of State, GPA/LAB"]
  spec.email         = ["rewersmc@america.gov"]

  spec.summary       = "A documentation theme for GitHub Pages."
  spec.homepage      = "https://github.com/iip-design/lab-notes"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|404|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", ">= 3.5", "< 5.0"
  spec.add_runtime_dependency "jemoji", "~> 0.12"

  spec.add_development_dependency "bundler", "~> 2.2"
  spec.add_development_dependency "rake", "~> 13.0"
end
