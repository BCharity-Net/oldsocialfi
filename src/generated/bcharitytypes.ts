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
export type Program = Post & { pubId: string }
export type Volunteer = Post & { pubId: string }
export type Fundraise = Post & { pubId: string }
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
