package main

import (
	"context"

	"cloud.google.com/go/firestore"
	"github.com/aubss/fasthttplogger"
	"github.com/fasthttp/router"
	"github.com/jorgejr568/investment-simulator/cfg"
	"github.com/jorgejr568/investment-simulator/handlers"
	"github.com/rs/zerolog/log"
	"github.com/valyala/fasthttp"
)

func registerHandlers(ctx context.Context, r *router.Router, c *firestore.Client) {
	handlers.NewHealthHandler().SetupRoutes(r)
	handlers.NewSimulationHandler(ctx, c).SetupRoutes(r)
}

func setupFirestore(ctx context.Context) (*firestore.Client, error) {
	return firestore.NewClient(ctx, cfg.GetEnv().GCP_PROJECT_ID)
}
func main() {
	ctx := context.Background()
	r := router.New()
	c, err := setupFirestore(ctx)
	if err != nil {
		log.Error().Err(err).Msg("Couldn't connect to firestore")
		return
	}
	registerHandlers(ctx, r, c)

	s := &fasthttp.Server{
		Handler: fasthttplogger.TinyColored(r.Handler),
		Name:    "FastHttpLogger",
	}

	log.Info().Msgf("Server started at http://localhost%s", cfg.GetEnv().PORT)
	log.Fatal().Err(s.ListenAndServe(cfg.GetEnv().PORT)).Msg("Couldn't start ListenAndServe")
}
