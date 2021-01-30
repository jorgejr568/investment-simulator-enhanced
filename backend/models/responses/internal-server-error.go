package responses

import "github.com/valyala/fasthttp"

func InternalServerError(ctx *fasthttp.RequestCtx) {
	ctx.Response.SetStatusCode(fasthttp.StatusInternalServerError)
	ctx.Write([]byte("Internal Server Error"))
}
