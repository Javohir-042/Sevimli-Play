import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { PlansModule } from './plans/plans.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { DevicesModule } from './devices/devices.module';
import { ContentsModule } from './contents/contents.module';
import { TagsModule } from './tags/tags.module';
import { ContentTagsModule } from './content-tags/content-tags.module';
import { CategoriesModule } from './categories/categories.module';
import { ContentCategoriesModule } from './content-categories/content-categories.module';
import { RatingsModule } from './ratings/ratings.module';
import { WatchEpisodesModule } from './episodes/episodes.module';
import { MediaFilesModule } from './media_files/media_files.module';
import { ThumbnailsModule } from './thumbnails/thumbnails.module';
import { WatchHistoriesModule } from './watch_histories/watch_histories.module';
import { CommentsModule } from './comments/comments.module';
import { PeopleModule } from './people/people.module';
import { ContentPeopleModule } from './content_people/content_people.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<"postgres">("DB_CONNECTION"),
        host: config.get<string>("DB_HOST"),
        username: config.get<string>("DB_USERNAME"),
        password: config.get<string>("DB_PASSWORD"),
        port: config.get<number>("DB_PORT"),
        database: config.get<string>("DB_DATABASE"),
        synchronize: true,
        autoLoadEntities: true,
        logging: ['error', 'warn'],
      }),
    }),

    AuthModule,

    AdminModule,

    UsersModule,

    PlansModule,

    SubscriptionsModule,

    PaymentsModule,

    ProfilesModule,

    DevicesModule,

    ContentsModule,

    TagsModule,

    ContentTagsModule,

    CategoriesModule,

    ContentCategoriesModule,

    RatingsModule,

    WatchEpisodesModule,

    MediaFilesModule,

    ThumbnailsModule,

    WatchHistoriesModule,

    CommentsModule,

    PeopleModule,

    ContentPeopleModule,




  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
