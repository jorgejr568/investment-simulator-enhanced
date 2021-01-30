package cfg

import (
	env "github.com/Netflix/go-env"
	"github.com/rs/zerolog/log"
)

type Environment struct {
	ADDR                           string `env:"ADDR,default=:8080"`
	GCP_PROJECT_ID                 string `env:"GCP_PROJECT_ID,default=investment-simulator-prod"`
	GOOGLE_APPLICATION_CREDENTIALS string `env:"GOOGLE_APPLICATION_CREDENTIALS,default=./application_default_credentials.json"`
	Extras                         env.EnvSet
}

var environment Environment

func init() {
	es, err := env.UnmarshalFromEnviron(&environment)
	if err != nil {
		log.Error().Err(err).Msg("Could not unmarshal environment")
		return
	}
	// Remaining environment variables.
	environment.Extras = es
}

func GetEnv() *Environment {
	return &environment
}
