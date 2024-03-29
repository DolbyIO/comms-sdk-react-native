# Enumeration: ConferenceStatus

[internal](../modules/internal.md).ConferenceStatus

The ConferenceStatus enum gathers the possible conference statuses.

## Table of contents

### Enumeration Members

- [CREATED](internal.ConferenceStatus.md#created)
- [CREATING](internal.ConferenceStatus.md#creating)
- [DEFAULT](internal.ConferenceStatus.md#default)
- [DESTROYED](internal.ConferenceStatus.md#destroyed)
- [ENDED](internal.ConferenceStatus.md#ended)
- [ERROR](internal.ConferenceStatus.md#error)
- [JOINED](internal.ConferenceStatus.md#joined)
- [JOINING](internal.ConferenceStatus.md#joining)
- [LEAVING](internal.ConferenceStatus.md#leaving)
- [LEFT](internal.ConferenceStatus.md#left)

## Enumeration Members

### CREATED

• **CREATED** = ``"CREATED"``

A new conference is created.

___

### CREATING

• **CREATING** = ``"CREATING"``

The SDK is creating a conference.

___

### DEFAULT

• **DEFAULT** = ``"DEFAULT"``

The default conference status.

___

### DESTROYED

• **DESTROYED** = ``"DESTROYED"``

Informs that the conference is destroyed. This status may be triggered by the following situations:
- All conference participants left a conference
- The time to live or the conference time limit elapsed
- A conference creator used the Terminate REST API to terminate an ongoing conference

___

### ENDED

• **ENDED** = ``"ENDED"``

A conference is ended.

___

### ERROR

• **ERROR** = ``"ERROR"``

An error occurred during a conference.

___

### JOINED

• **JOINED** = ``"JOINED"``

The local participant successfully joined a conference.

___

### JOINING

• **JOINING** = ``"JOINING"``

The local participant is joining a conference.

___

### LEAVING

• **LEAVING** = ``"LEAVING"``

The local participant is leaving a conference.

___

### LEFT

• **LEFT** = ``"LEFT"``

The local participant successfully left a conference.
