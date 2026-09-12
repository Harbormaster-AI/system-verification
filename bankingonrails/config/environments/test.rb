Rails.application.configure do
  config.enable_reloading = true
  config.eager_load = false

  config.consider_all_requests_local = true

  config.action_controller.perform_caching = false

  config.active_storage.service = :local

  config.active_job.queue_adapter = :async

  config.hosts.clear
end