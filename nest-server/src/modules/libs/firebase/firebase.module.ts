import { Module } from '@nestjs/common';

import { FirebaseProvider } from 'src/modules/libs/firebase/firebase.provider';

@Module({
  providers: [FirebaseProvider]
})
export class FirebaseModule {}
