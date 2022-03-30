import {
  Comment,
  EmptyCollectModuleSettings,
  FeeCollectModuleSettings,
  LimitedFeeCollectModuleSettings,
  LimitedTimedFeeCollectModuleSettings,
  Mirror,
  NewCollectNotification,
  NewCommentNotification,
  NewMirrorNotification,
  Post,
  RevertCollectModuleSettings,
  TimedFeeCollectModuleSettings
} from './types'

export type BCharityPost = Post & Mirror & Comment & { pubId: string }
export type Community = Post & { pubId: string }
export type BCharityCollectModule = EmptyCollectModuleSettings &
  FeeCollectModuleSettings &
  LimitedFeeCollectModuleSettings &
  LimitedTimedFeeCollectModuleSettings &
  RevertCollectModuleSettings &
  TimedFeeCollectModuleSettings
export type BCharityNewMirrorNotification = NewMirrorNotification & {
  publication: { pubId: string }
}
export type BCharityNewCommentNotification = NewCommentNotification & {
  comment: { pubId: string }
}
export type BCharityNewCollectNotification = NewCollectNotification & {
  collectedPublication: { pubId: string }
}
