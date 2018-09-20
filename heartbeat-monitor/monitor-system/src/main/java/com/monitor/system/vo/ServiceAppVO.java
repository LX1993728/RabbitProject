package com.monitor.system.vo;

import java.util.HashMap;
import java.util.Map;

import heartbeat.monitor.starter.domain.ServiceApp;

public class ServiceAppVO extends ServiceApp {
	private Map<String, Long> counts = new HashMap<>();

	private Integer run=0;

	public Map<String, Long> getCounts() {
		return counts;
	}

	public void setCounts(Map<String, Long> counts) {
		this.counts = counts;
	}

	public void copyPropertyToThis(ServiceApp app) {
		this.setFlag(app.getFlag());
		this.setId(app.getId());
		this.setInstances(app.getInstances());
		this.setServiceName(app.getServiceName());
	}

	public Integer getRun() {
		return run;
	}

	public void setRun(Integer run) {
		this.run = run;
	}
}
