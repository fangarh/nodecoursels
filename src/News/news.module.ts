import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { NewsSchema } from './schema/news.schema'
import { NewsService } from './news.service'



@Module({
    imports: [MongooseModule.forFeature([{ name: "News", schema: NewsSchema }])],
    providers: [NewsService],
    controllers: [],
    exports: [NewsService]
})
export class NewsModule {

}