package responses

import "github.com/valyala/fasthttp"

func NotFound(ctx *fasthttp.RequestCtx) {
	ctx.Response.SetStatusCode(fasthttp.StatusNotFound)
	ctx.Write([]byte("Not found"))
}
