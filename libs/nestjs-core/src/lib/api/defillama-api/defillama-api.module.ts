import { Module } from "@nestjs/common";
import { DefiLlamaApiService } from "./defillama-api.service";

@Module({
  providers: [DefiLlamaApiService],
  exports: [DefiLlamaApiService],
})
export class DefiLlamaApiModule {}
