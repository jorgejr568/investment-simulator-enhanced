package responses

import "github.com/valyala/fasthttp"

func NoContent(ctx *fasthttp.RequestCtx) {
	ctx.Response.SetStatusCode(fasthttp.StatusNoContent)
	ctx.Write([]byte(""))
}
