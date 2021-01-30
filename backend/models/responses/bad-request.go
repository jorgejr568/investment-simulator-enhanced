package responses

import "github.com/valyala/fasthttp"

func BadRequest(ctx *fasthttp.RequestCtx) {
	ctx.Response.SetStatusCode(fasthttp.StatusBadRequest)
	ctx.Write([]byte("Bad request"))
}
