package responses

import (
	"encoding/json"

	"github.com/valyala/fasthttp"
)

func ValidationFails(ctx *fasthttp.RequestCtx, error string) {
	ctx.SetStatusCode(fasthttp.StatusUnprocessableEntity)
	ms, _ := json.Marshal(map[string]interface{}{
		"error": error,
	})
	ctx.Write(ms)
}
