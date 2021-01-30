package responses

import (
	"encoding/json"

	"github.com/rs/zerolog/log"
	"github.com/valyala/fasthttp"
)

func JSON(ctx *fasthttp.RequestCtx, body interface{}) error {
	ctx.Response.Header.Set("content-type", "application/json")
	ctx.Response.SetStatusCode(fasthttp.StatusOK)

	ms, err := json.Marshal(body)
	if err != nil {
		log.Error().Err(err).Msg("Could not marshal body")
		return err
	}
	if _, err := ctx.Write(ms); err != nil {
		log.Error().Err(err).Msg("Could not write response")
		return err
	}

	return nil
}
