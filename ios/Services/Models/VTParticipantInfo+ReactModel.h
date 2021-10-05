///
/// Extension of VTParticipantInfo class to support react model.
///
@import VoxeetSDK;

@interface VTParticipantInfo (ReactModel)
///
/// Creates instance of the class from react model.
///
/// \param dictionary react model
///
+ (instancetype _Nonnull)createWithDictionary:(NSDictionary * _Nonnull)dictionary;
///
/// Generates react model of the class.
///
/// \return NSDictionary
///
- (NSDictionary * _Nonnull)reactDescription;

@end