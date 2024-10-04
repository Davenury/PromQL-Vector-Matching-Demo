# Vector Matching demo

A git repository for Vector Matching (and various other) demos regarding Observability (Grafana, Prometheus, etc).

## Contents
Repository contains of two core elements:
* sample application
* devops helm chart for easy environment setup

### Sample Application
An easy server in NodeJS + Express to showcase metrics demos. Application contains an endpoint to "catch" Pokemons, which increases the value of `caught_pokemon` counter (with `pokemon_type` label) and saves it to in-memory list, as well as an endpoint for getting the list of "caught" Pokemons. The second part of the application is workload creator, which (randomly) either requests the list of "caught" Pokemons or requests a random Pokemon from pokeapi to "catch" (sends a POST request to the api). Api is scraped by Prometheus.

### Helm chart
Helm chart is designed to easily deploy Prometheus, Grafana, and sample app onto an kubernetes cluster. Grafana already has provisioned Prometheus datasource, Prometheus scrape config is left to default. Sample application is configured to be scraped by Prometheus.
