# TgBattleCheatManager

## Variables

### m_DebugCameraController

**Type:** `TgDemoRecSpectator_Debug`

```csharp
var TgDemoRecSpectator_Debug m_DebugCameraController;
```

### m_DebugPlayerStarts

**Type:** `array<PlayerStart>`

```csharp
var array<PlayerStart> m_DebugPlayerStarts;
```

## Functions

### CheatLog

**Parameters:**

- `cheatText`: string
- `bOn`: bool

**Modifiers:** function

```csharp
function CheatLog(string cheatText, bool bOn)
```

### KillAllPawnsHelper

**Parameters:**

- `PawnClass`: class&lt;Pawn&gt;

**Modifiers:** function

```csharp
function KillAllPawnsHelper(class<Pawn> PawnClass)
```

### RemoveDeviceFromPawnAt

**Parameters:**

- `TgP`: TgPawn
- `nEquipPointId`: int

**Modifiers:** function

```csharp
function RemoveDeviceFromPawnAt(TgPawn TgP, int nEquipPointId)
```

### EquipDeviceOnPawn

**Parameters:**

- `TgP`: TgPawn
- `nDeviceId`: int
- `nEquipPointId`: int
- `FireMode`: optional int
  - default: 0

**Modifiers:** function

```csharp
function EquipDeviceOnPawn(TgPawn TgP, int nDeviceId, int nEquipPointId, optional int FireMode = 0)
```

## Exec Functions

### separator

**Modifiers:** exec, function

```csharp
exec function separator()
```

### sc

**Parameters:**

- `godName`: string
- `skinName`: optional string
  - default: ""
- `weaponSkinName`: optional string
  - default: ""
- `headName`: optional string
  - default: ""

**Modifiers:** exec, function

```csharp
exec function sc(string godName, optional string skinName, optional string weaponSkinName, optional string headName)
```

### echo

**Parameters:**

- `inputString`: string

**Modifiers:** exec, function

```csharp
exec function echo(string inputString)
```

### Loc

**Modifiers:** exec, function

```csharp
exec function Loc()
```

### ServerExec

**Parameters:**

- `FSCommand`: string

**Modifiers:** exec, function

```csharp
exec function ServerExec(string FSCommand)
```

### SpawnTestBot

**Parameters:**

- `sName`: string
- `sDeviceName`: optional string
  - default: ""
- `nFireMode`: optional int
  - default: 0
- `nTaskForce`: optional int
  - default: 2
- `nCount`: optional int
  - default: 1

**Modifiers:** exec, function

```csharp
exec function SpawnTestBot(string sName, optional string sDeviceName, optional int nFireMode = 0, optional int nTaskForce = 2, optional int nCount = 1)
```

### SpawnEmoteTestBot

**Parameters:**

- `sName`: string
- `nTaskForce`: optional int
  - default: 2
- `nCount`: optional int
  - default: 1

**Modifiers:** exec, function

```csharp
exec function SpawnEmoteTestBot(string sName, optional int nTaskForce = 2, optional int nCount = 1)
```

### stb

**Parameters:**

- `sName`: string
- `sDeviceName`: optional string
  - default: ""
- `nFireMode`: optional int
  - default: 0
- `nTaskForce`: optional int
  - default: 2
- `nCount`: optional int
  - default: 1

**Modifiers:** exec, function

```csharp
exec function stb(string sName, optional string sDeviceName, optional int nFireMode = 0, optional int nTaskForce = 2, optional int nCount = 1)
```

### \_SpawnBot

**Parameters:**

- `sName`: string
- `nTaskForce`: optional int
  - default: 2
- `nCount`: optional int
  - default: 1

**Modifiers:** exec, function

```csharp
exec function _SpawnBot(string sName, optional int nTaskForce = 2, optional int nCount = 1)
```

### SpawnBot

**Parameters:**

- `sName`: string
- `nTaskForce`: optional int
  - default: 2
- `nCount`: optional int
  - default: 1
- `BotDifficulty`: optional int
  - default: 1
- `BehaviorTreeName`: optional string
  - default: ""
- `nHeadId`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function SpawnBot(string sName, optional int nTaskForce = 2, optional int nCount = 1, optional int BotDifficulty = 1, optional string BehaviorTreeName, optional int nHeadId)
```

### TestSkinGallery

**Parameters:**

- `nGallery`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function TestSkinGallery(optional int nGallery = 0)
```

### MaxLevel

**Modifiers:** exec, function

```csharp
exec function MaxLevel()
```

### ML

**Modifiers:** exec, function

```csharp
exec function ML()
```

### SimNWCondition

**Parameters:**

- `nPktLoss`: int
- `nPktLag`: int

**Modifiers:** exec, function

```csharp
exec function SimNWCondition(int nPktLoss, int nPktLag)
```

### God

**Modifiers:** exec, function, simulated

```csharp
simulated exec function God()
```

### energy

**Modifiers:** exec, function, simulated

```csharp
simulated exec function energy()
```

### Cooldown

**Modifiers:** exec, function, simulated

```csharp
simulated exec function Cooldown()
```

### ForceToggleMount

**Modifiers:** exec, function, simulated

```csharp
simulated exec function ForceToggleMount()
```

### MaxPower

**Modifiers:** exec, function

```csharp
exec function MaxPower()
```

### HookMeUp

**Modifiers:** exec, function

```csharp
exec function HookMeUp()
```

### GiveRecommendedItems

**Modifiers:** exec, function

```csharp
exec function GiveRecommendedItems()
```

### SetGroundspeed

**Parameters:**

- `val`: float

**Modifiers:** exec, function

```csharp
exec function SetGroundspeed(float val)
```

### SetStealth

**Parameters:**

- `bOn`: bool

**Modifiers:** exec, function

```csharp
exec function SetStealth(bool bOn)
```

### ShowMoveErrors

**Modifiers:** exec, function

```csharp
exec function ShowMoveErrors()
```

### DebugProjectileLagCompensationServer

**Modifiers:** exec, function

```csharp
exec function DebugProjectileLagCompensationServer()
```

### DebugProjectileLagCompensationClient

**Modifiers:** exec, function

```csharp
exec function DebugProjectileLagCompensationClient()
```

### \_SpawnTemplatePlayer

**Parameters:**

- `nProfileId`: int
- `nSkinId`: optional int
  - default: 0
- `nWeaponSkinId`: optional int
  - default: 0
- `nHeadSkinId`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function _SpawnTemplatePlayer(int nProfileId, optional int nSkinId = 0, optional int nWeaponSkinId = 0, optional int nHeadSkinId = 0)
```

### KillAllMinions

**Modifiers:** exec, function

```csharp
exec function KillAllMinions()
```

### KillAllPawnsByClass

**Parameters:**

- `PawnClassName`: string

**Modifiers:** exec, function

```csharp
exec function KillAllPawnsByClass(string PawnClassName)
```

### ToggleDeviceLog

**Parameters:**

- `eqp`: optional TgObject.TG_EQUIP_POINT
  - default: 0

**Modifiers:** exec, function, simulated

```csharp
simulated exec function ToggleDeviceLog(optional TgObject.TG_EQUIP_POINT eqp = 0)
```

### ToggleCustomPhysics

**Modifiers:** exec, function, simulated

```csharp
simulated exec function ToggleCustomPhysics()
```

### ToggleAIDebug

**Parameters:**

- `bAttachAIDebugger`: optional bool
  - default: false

**Modifiers:** exec, function

```csharp
exec function ToggleAIDebug(optional bool bAttachAIDebugger = false)
```

### TestObstacleAvoidance

**Parameters:**

- `TestType`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function TestObstacleAvoidance(optional int TestType)
```

### RequestRelease

**Modifiers:** exec, function

```csharp
exec function RequestRelease()
```

### botsgod

**Parameters:**

- `bOn`: optional bool
  - default: true

**Modifiers:** exec, function

```csharp
exec function botsgod(optional bool bOn = true)
```

### FreezeAI

**Parameters:**

- `bOn`: optional bool
  - default: true

**Modifiers:** exec, function

```csharp
exec function FreezeAI(optional bool bOn = true)
```

### botslevel

**Parameters:**

- `nLevel`: int

**Modifiers:** exec, function

```csharp
exec function botslevel(int nLevel)
```

### SpectatorCamera

**Parameters:**

- `bOn`: optional bool
  - default: true

**Modifiers:** exec, function, simulated

```csharp
simulated exec function SpectatorCamera(optional bool bOn = true)
```

### ApplyProp

**Parameters:**

- `nPropId`: int
- `nValue`: float
- `nCategory`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function ApplyProp(int nPropId, float nValue, optional int nCategory = 0)
```

### BeTheBoss

**Modifiers:** exec, function

```csharp
exec function BeTheBoss()
```

### ShowFootstepInfo

**Modifiers:** event, exec

```csharp
exec event ShowFootstepInfo()
```

### ToggleAimAssist

**Modifiers:** exec, function

```csharp
exec function ToggleAimAssist()
```

### SetAimAssistTargetWeightVars

**Parameters:**

- `CurrentTargetBonus`: float
- `NotCurrentTargetPenalty`: float
- `MinAccuracyBonus`: float
- `MaxAccuracyBonus`: float
- `MinInaccuracyPenalty`: float
- `MaxInaccuracyPenalty`: float
- `MaxWeight`: float

**Modifiers:** exec, function

```csharp
exec function SetAimAssistTargetWeightVars(float CurrentTargetBonus, float NotCurrentTargetPenalty, float MinAccuracyBonus, float MaxAccuracyBonus, float MinInaccuracyPenalty, float MaxInaccuracyPenalty, float MaxWeight)
```

### ResetAimAssistValues

**Modifiers:** exec, function

```csharp
exec function ResetAimAssistValues()
```

### SetAimAssistValues

**Parameters:**

- `MagnetScaleX`: float
- `MagnetScaleY`: float
- `FrictionScaleX`: float
- `FrictionScaleY`: float
- `TrackingScaleX`: float
- `TrackingScaleY`: float

**Modifiers:** exec, function

```csharp
exec function SetAimAssistValues(float MagnetScaleX, float MagnetScaleY, float FrictionScaleX, float FrictionScaleY, float TrackingScaleX, float TrackingScaleY)
```

### SetAimVectorAssistValues

**Parameters:**

- `BoundsScaleX`: float
- `BoundsScaleY`: float
- `MaxAngleX`: float
- `MaxAngleY`: float

**Modifiers:** exec, function

```csharp
exec function SetAimVectorAssistValues(float BoundsScaleX, float BoundsScaleY, float MaxAngleX, float MaxAngleY)
```

### AddAimAssistKeyframe

**Parameters:**

- `keyframeType`: string
- `KeyframeName`: string
- `Distance`: float

**Modifiers:** exec, function

```csharp
exec function AddAimAssistKeyframe(string keyframeType, string KeyframeName, float Distance)
```

### ResetAimAssistKeyframes

**Parameters:**

- `keyframeType`: string

**Modifiers:** exec, function

```csharp
exec function ResetAimAssistKeyframes(string keyframeType)
```

### RefillAmmo

**Modifiers:** exec, function

```csharp
exec function RefillAmmo()
```

### SetMaxAmmo

**Parameters:**

- `MaxAmmo`: int

**Modifiers:** exec, function

```csharp
exec function SetMaxAmmo(int MaxAmmo)
```

### ChangeTaskForce

**Parameters:**

- `nTaskForce`: byte

**Modifiers:** exec, function

```csharp
exec function ChangeTaskForce(byte nTaskForce)
```

### ct

**Parameters:**

- `nTaskForce`: byte

**Modifiers:** exec, function

```csharp
exec function ct(byte nTaskForce)
```

### ToggleTaskForce

**Modifiers:** exec, function

```csharp
exec function ToggleTaskForce()
```

### TargetEquipDevice

**Parameters:**

- `nDeviceId`: int
- `nEquipPointId`: int
- `FireMode`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function TargetEquipDevice(int nDeviceId, int nEquipPointId, optional int FireMode = 0)
```

### TED

**Parameters:**

- `nDeviceId`: int
- `nEquipPointId`: int
- `FireMode`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function TED(int nDeviceId, int nEquipPointId, optional int FireMode = 0)
```

### TargetEquipDeviceByName

**Parameters:**

- `sDeviceName`: string
- `nEquipPointId`: int
- `FireMode`: optional int
  - default: 1

**Modifiers:** exec, function

```csharp
exec function TargetEquipDeviceByName(string sDeviceName, int nEquipPointId, optional int FireMode = 1)
```

### TEDBN

**Parameters:**

- `sDeviceName`: string
- `nEquipPointId`: int
- `FireMode`: optional int
  - default: 1

**Modifiers:** exec, function

```csharp
exec function TEDBN(string sDeviceName, int nEquipPointId, optional int FireMode = 1)
```

### EquipDeviceByName

**Parameters:**

- `sDeviceName`: string
- `nEquipPointId`: int
- `FireMode`: optional int
  - default: 1

**Modifiers:** exec, function

```csharp
exec function EquipDeviceByName(string sDeviceName, int nEquipPointId, optional int FireMode = 1)
```

### EDBN

**Parameters:**

- `sDeviceName`: string
- `nEquipPointId`: int
- `FireMode`: optional int
  - default: 1

**Modifiers:** exec, function

```csharp
exec function EDBN(string sDeviceName, int nEquipPointId, optional int FireMode = 1)
```

### EquipDevice

**Parameters:**

- `nDeviceId`: int
- `nEquipPointId`: int
- `FireMode`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function EquipDevice(int nDeviceId, int nEquipPointId, optional int FireMode = 0)
```

### ED

**Parameters:**

- `nDeviceId`: int
- `nEquipPointId`: int
- `FireMode`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function ED(int nDeviceId, int nEquipPointId, optional int FireMode = 0)
```

### UnequipDevice

**Parameters:**

- `nDeviceId`: int

**Modifiers:** exec, function

```csharp
exec function UnequipDevice(int nDeviceId)
```

### UD

**Parameters:**

- `nDeviceId`: int

**Modifiers:** exec, function

```csharp
exec function UD(int nDeviceId)
```

### RemoveDevice

**Parameters:**

- `nDeviceId`: int

**Modifiers:** exec, function

```csharp
exec function RemoveDevice(int nDeviceId)
```

### UnequipDeviceAt

**Parameters:**

- `nEquipPointId`: int

**Modifiers:** exec, function

```csharp
exec function UnequipDeviceAt(int nEquipPointId)
```

### RemoveDeviceAt

**Parameters:**

- `nDeviceId`: int

**Modifiers:** exec, function

```csharp
exec function RemoveDeviceAt(int nDeviceId)
```

### RemoveAllCards

**Modifiers:** exec, function

```csharp
exec function RemoveAllCards()
```

### RemoveAllItems

**Modifiers:** exec, function

```csharp
exec function RemoveAllItems()
```

### AddGold

**Parameters:**

- `nCurrency`: int

**Modifiers:** exec, function

```csharp
exec function AddGold(int nCurrency)
```

### Obama

**Parameters:**

- `nCurrency`: int

**Modifiers:** exec, function

```csharp
exec function Obama(int nCurrency)
```

### SetMeLevel

**Parameters:**

- `nLevel`: int

**Modifiers:** exec, function

```csharp
exec function SetMeLevel(int nLevel)
```

### SL

**Parameters:**

- `nLevel`: int

**Modifiers:** exec, function

```csharp
exec function SL(int nLevel)
```

### QuickEndGame

**Parameters:**

- `bWin`: bool

**Modifiers:** exec, function

```csharp
exec function QuickEndGame(bool bWin)
```

### QEG

**Parameters:**

- `bWin`: optional bool
  - default: true

**Modifiers:** exec, function

```csharp
exec function QEG(optional bool bWin = true)
```

### SetEnergy

**Parameters:**

- `Value`: float

**Modifiers:** exec, function

```csharp
exec function SetEnergy(float Value)
```

### TestShowInventory

**Modifiers:** exec, function

```csharp
exec function TestShowInventory()
```

### TestStunEffect

**Parameters:**

- `fDuration`: float

**Modifiers:** exec, function

```csharp
exec function TestStunEffect(float fDuration)
```

### TestStun

**Parameters:**

- `Type`: Controller.EStunType

**Modifiers:** exec, function

```csharp
exec function TestStun(Controller.EStunType Type)
```

### ShowPlayerCircles

**Parameters:**

- `bEnabled`: bool

**Modifiers:** exec, function

```csharp
exec function ShowPlayerCircles(bool bEnabled)
```

### ToggleSpectatorCamera

**Modifiers:** exec, function

```csharp
exec function ToggleSpectatorCamera()
```

### InvisMe

**Parameters:**

- `bInvis`: bool

**Modifiers:** exec, function

```csharp
exec function InvisMe(bool bInvis)
```

### capturePoint

**Modifiers:** exec, function

```csharp
exec function capturePoint()
```

### EnemyCapturePoint

**Modifiers:** exec, function

```csharp
exec function EnemyCapturePoint()
```

### ToggleCapturePointOvertime

**Modifiers:** exec, function

```csharp
exec function ToggleCapturePointOvertime()
```

### PickPoint

**Parameters:**

- `Index`: optional int
  - default: -1

**Modifiers:** exec, function

```csharp
exec function PickPoint(optional int Index = -1)
```

### SetSiegeSpeed

**Parameters:**

- `fSpeed`: float

**Modifiers:** exec, function

```csharp
exec function SetSiegeSpeed(float fSpeed)
```

### SetRespawnIncrease

**Parameters:**

- `fIncrease`: float

**Modifiers:** exec, function

```csharp
exec function SetRespawnIncrease(float fIncrease)
```

### SetDefenseRespawn

**Parameters:**

- `fDuration`: float

**Modifiers:** exec, function

```csharp
exec function SetDefenseRespawn(float fDuration)
```

### SetAttackRespawn

**Parameters:**

- `fDuration`: float

**Modifiers:** exec, function

```csharp
exec function SetAttackRespawn(float fDuration)
```

### SetRespawnCap

**Parameters:**

- `fDuration`: float

**Modifiers:** exec, function

```csharp
exec function SetRespawnCap(float fDuration)
```

### SetCardCooldownIncrease

**Parameters:**

- `fIncrease`: float

**Modifiers:** exec, function

```csharp
exec function SetCardCooldownIncrease(float fIncrease)
```

### ForceRespawnAll

**Modifiers:** exec, function

```csharp
exec function ForceRespawnAll()
```

### SetHealth

**Parameters:**

- `Health`: int

**Modifiers:** exec, function

```csharp
exec function SetHealth(int Health)
```

### SetMana

**Parameters:**

- `mana`: int

**Modifiers:** exec, function

```csharp
exec function SetMana(int mana)
```

### DamageHealth

**Parameters:**

- `DamageAmount`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function DamageHealth(optional int DamageAmount)
```

### Heal

**Parameters:**

- `HealAmount`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function Heal(optional int HealAmount)
```

### DamageTarget

**Parameters:**

- `DamageAmount`: optional int
  - default: -1

**Modifiers:** exec, function

```csharp
exec function DamageTarget(optional int DamageAmount = -1)
```

### HealTarget

**Parameters:**

- `HealAmount`: optional int
  - default: -1

**Modifiers:** exec, function

```csharp
exec function HealTarget(optional int HealAmount = -1)
```

### ShieldTarget

**Parameters:**

- `Amount`: optional int
  - default: 1000

**Modifiers:** exec, function

```csharp
exec function ShieldTarget(optional int Amount = 1000)
```

### StopHP5

**Modifiers:** exec, function

```csharp
exec function StopHP5()
```

### SkipSetup

**Modifiers:** exec, function

```csharp
exec function SkipSetup()
```

### ShowProjectileDebug

**Parameters:**

- `bEnabled`: bool

**Modifiers:** exec, function

```csharp
exec function ShowProjectileDebug(bool bEnabled)
```

### DisableProximity

**Parameters:**

- `bEnabled`: bool

**Modifiers:** exec, function

```csharp
exec function DisableProximity(bool bEnabled)
```

### GiveCard

**Parameters:**

- `nDeviceId`: int

**Modifiers:** exec, function

```csharp
exec function GiveCard(int nDeviceId)
```

### ForceLanePusher

**Modifiers:** exec, function

```csharp
exec function ForceLanePusher()
```

### EnableScoring

**Modifiers:** exec, function

```csharp
exec function EnableScoring()
```

### DisableScoring

**Modifiers:** exec, function

```csharp
exec function DisableScoring()
```

### SetScore

**Parameters:**

- `tf1Score`: optional int
  - default: 0
- `tf2Score`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function SetScore(optional int tf1Score = 0, optional int tf2Score = 0)
```

### EndGame

**Modifiers:** exec, function

```csharp
exec function EndGame()
```

### HelpMe

**Modifiers:** exec, function

```csharp
exec function HelpMe()
```

### QuickSiege

**Modifiers:** exec, function

```csharp
exec function QuickSiege()
```

### ReinforceDoors

**Parameters:**

- `healthAmt`: optional int
  - default: 20000000

**Modifiers:** exec, function

```csharp
exec function ReinforceDoors(optional int healthAmt = 20000000)
```

### ReinforceSiege

**Parameters:**

- `healthAmt`: optional int
  - default: 20000000

**Modifiers:** exec, function

```csharp
exec function ReinforceSiege(optional int healthAmt = 20000000)
```

### SetGameEnvironmentRule

**Parameters:**

- `Rule`: TgObject.EGameEnvironmentRule

**Modifiers:** exec, function

```csharp
exec function SetGameEnvironmentRule(TgObject.EGameEnvironmentRule Rule)
```

### SetGameRespawnRule

**Parameters:**

- `Rule`: TgObject.EGameRespawnRule

**Modifiers:** exec, function

```csharp
exec function SetGameRespawnRule(TgObject.EGameRespawnRule Rule)
```

### SetGameMode

**Parameters:**

- `Mode`: TgObject.EGameMode

**Modifiers:** exec, function

```csharp
exec function SetGameMode(TgObject.EGameMode Mode)
```

### SetAirFriction

**Parameters:**

- `frictionAmt`: float

**Modifiers:** exec, function

```csharp
exec function SetAirFriction(float frictionAmt)
```

### SetFallingFriction

**Parameters:**

- `frictionAmt`: float

**Modifiers:** exec, function

```csharp
exec function SetFallingFriction(float frictionAmt)
```

### SetFlyingFriction

**Parameters:**

- `frictionAmt`: float

**Modifiers:** exec, function

```csharp
exec function SetFlyingFriction(float frictionAmt)
```

### TestSpawnPoints

**Parameters:**

- `PauseTime`: optional float
  - default: 3.0000000

**Modifiers:** exec, function

```csharp
exec function TestSpawnPoints(optional float PauseTime = 3.0000000)
```

### SetInstantFireMeshTrace

**Parameters:**

- `bEnabled`: bool

**Modifiers:** exec, function

```csharp
exec function SetInstantFireMeshTrace(bool bEnabled)
```

### ToggleWeaponLagPrediction

**Modifiers:** exec, function

```csharp
exec function ToggleWeaponLagPrediction()
```

### SetMaximumLagPrediction

**Parameters:**

- `NewMaximum`: float

**Modifiers:** exec, function

```csharp
exec function SetMaximumLagPrediction(float NewMaximum)
```

### DumpWeaponPredictionStats

**Modifiers:** exec, function

```csharp
exec function DumpWeaponPredictionStats()
```

### DumpLastServerAims

**Modifiers:** exec, function

```csharp
exec function DumpLastServerAims()
```

### DumpLastClientAims

**Modifiers:** exec, function

```csharp
exec function DumpLastClientAims()
```

### SetDamageMultiplier

**Parameters:**

- `NewMult`: float

**Modifiers:** exec, function

```csharp
exec function SetDamageMultiplier(float NewMult)
```

### SetGroundSpeedMultiplier

**Parameters:**

- `NewMult`: float

**Modifiers:** exec, function

```csharp
exec function SetGroundSpeedMultiplier(float NewMult)
```

### SetAutoHealingMultiplier

**Parameters:**

- `NewMult`: float

**Modifiers:** exec, function

```csharp
exec function SetAutoHealingMultiplier(float NewMult)
```

### ToggleSiegeEngineRequiresAllies

**Modifiers:** exec, function

```csharp
exec function ToggleSiegeEngineRequiresAllies()
```

### SetVaultImmuneHealth

**Parameters:**

- `fHealth`: float

**Modifiers:** exec, function

```csharp
exec function SetVaultImmuneHealth(float fHealth)
```

### SetVisibilityRanges

**Parameters:**

- `fNormal`: optional float
  - default: -1.0000000
- `fInVolume`: optional float
  - default: -1.0000000

**Modifiers:** exec, function

```csharp
exec function SetVisibilityRanges(optional float fNormal = -1.0000000, optional float fInVolume = -1.0000000)
```

### ForceRoundSetupEnd

**Modifiers:** exec, function

```csharp
exec function ForceRoundSetupEnd()
```

### FRSE

**Modifiers:** exec, function

```csharp
exec function FRSE()
```

### LevelAim

**Modifiers:** exec, function

```csharp
exec function LevelAim()
```

### Set1p

**Parameters:**

- `bForce1P`: optional bool
  - default: true

**Modifiers:** exec, function

```csharp
exec function Set1p(optional bool bForce1P = true)
```

### Set3p

**Parameters:**

- `bForce3P`: optional bool
  - default: true

**Modifiers:** exec, function

```csharp
exec function Set3p(optional bool bForce3P = true)
```

### Toggle3p

**Modifiers:** exec, function

```csharp
exec function Toggle3p()
```

### GainXP

**Parameters:**

- `xpAmount`: int

**Modifiers:** exec, function

```csharp
exec function GainXP(int xpAmount)
```

### GainCredits

**Parameters:**

- `creditsAmount`: int

**Modifiers:** exec, function

```csharp
exec function GainCredits(int creditsAmount)
```

### GainTickets

**Parameters:**

- `ticketsAmount`: int

**Modifiers:** exec, function

```csharp
exec function GainTickets(int ticketsAmount)
```

### EndRound

**Parameters:**

- `nTaskForce`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function EndRound(optional int nTaskForce = 0)
```

### OpenSpawnGates

**Modifiers:** exec, function

```csharp
exec function OpenSpawnGates()
```

### CloseSpawnGates

**Modifiers:** exec, function

```csharp
exec function CloseSpawnGates()
```

### SetCAPOvertime

**Parameters:**

- `overtimeDuration`: float
- `overtimeWarning`: optional float
  - default: -1.0000000

**Modifiers:** exec, function

```csharp
exec function SetCAPOvertime(float overtimeDuration, optional float overtimeWarning = -1.0000000)
```

### PayloadForever

**Modifiers:** exec, function

```csharp
exec function PayloadForever()
```

### SetAIAccuracy

**Parameters:**

- `DegreeMissed`: float
- `MissLikelihood`: float

**Modifiers:** exec, function

```csharp
exec function SetAIAccuracy(float DegreeMissed, float MissLikelihood)
```

### EnableThreat

**Parameters:**

- `bEnabled`: bool

**Modifiers:** exec, function

```csharp
exec function EnableThreat(bool bEnabled)
```

### EnableOcclusion

**Parameters:**

- `bEnabled`: bool

**Modifiers:** exec, function

```csharp
exec function EnableOcclusion(bool bEnabled)
```

### DisplayThreatParams

**Modifiers:** exec, function

```csharp
exec function DisplayThreatParams()
```

### ShowThreats

**Parameters:**

- `bEnabled`: bool
- `ChannelName`: optional string
  - default: ""

**Modifiers:** exec, function

```csharp
exec function ShowThreats(bool bEnabled, optional string ChannelName)
```

### AllNoah

**Parameters:**

- `ChannelName`: optional string
  - default: ""

**Modifiers:** exec, function

```csharp
exec function AllNoah(optional string ChannelName)
```

### AllowHeadShots

**Parameters:**

- `bEnable`: optional bool
  - default: true

**Modifiers:** exec, function

```csharp
exec function AllowHeadShots(optional bool bEnable = true)
```

### LiveRespawn

**Parameters:**

- `bResetHealth`: optional bool
  - default: true
- `bResetDevices`: optional bool
  - default: true

**Modifiers:** exec, function

```csharp
exec function LiveRespawn(optional bool bResetHealth = true, optional bool bResetDevices = true)
```

### SetBodyMesh

**Parameters:**

- `nBodyMeshID`: int

**Modifiers:** exec, function

```csharp
exec function SetBodyMesh(int nBodyMeshID)
```

### SBM

**Parameters:**

- `nBodyMeshID`: int

**Modifiers:** exec, function

```csharp
exec function SBM(int nBodyMeshID)
```

### SetBodyMeshByName

**Modifiers:** exec, function

```csharp
exec function SetBodyMeshByName()
```

### SBMBN

**Modifiers:** exec, function

```csharp
exec function SBMBN()
```

### SetHeadMesh

**Parameters:**

- `nHeadMeshID`: int

**Modifiers:** exec, function

```csharp
exec function SetHeadMesh(int nHeadMeshID)
```

### SHM

**Parameters:**

- `nHeadMeshID`: int

**Modifiers:** exec, function

```csharp
exec function SHM(int nHeadMeshID)
```

### SetHeadMeshByName

**Modifiers:** exec, function

```csharp
exec function SetHeadMeshByName()
```

### SHBN

**Modifiers:** exec, function

```csharp
exec function SHBN()
```

### RemoveHeadMesh

**Modifiers:** exec, function

```csharp
exec function RemoveHeadMesh()
```

### rhm

**Modifiers:** exec, function

```csharp
exec function rhm()
```

### decapitate

**Modifiers:** exec, function

```csharp
exec function decapitate()
```

### EnableHeadMesh

**Parameters:**

- `bEnabled`: bool

**Modifiers:** exec, function

```csharp
exec function EnableHeadMesh(bool bEnabled)
```

### ToggleHeadMesh

**Modifiers:** exec, function

```csharp
exec function ToggleHeadMesh()
```

### TargetSetMeshes

**Parameters:**

- `nBodyMeshID`: int
- `nHeadMeshID`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function TargetSetMeshes(int nBodyMeshID, optional int nHeadMeshID = 0)
```

### TSM

**Parameters:**

- `nBodyMeshID`: int
- `nHeadMeshID`: optional int
  - default: 0

**Modifiers:** exec, function

```csharp
exec function TSM(int nBodyMeshID, optional int nHeadMeshID = 0)
```

### TargetSetBodyMesh

**Parameters:**

- `nBodyMeshID`: int

**Modifiers:** exec, function

```csharp
exec function TargetSetBodyMesh(int nBodyMeshID)
```

### TSBM

**Parameters:**

- `nBodyMeshID`: int

**Modifiers:** exec, function

```csharp
exec function TSBM(int nBodyMeshID)
```

### TargetSetHeadMesh

**Parameters:**

- `nHeadMeshID`: int

**Modifiers:** exec, function

```csharp
exec function TargetSetHeadMesh(int nHeadMeshID)
```

### TSHM

**Parameters:**

- `nHeadMeshID`: int

**Modifiers:** exec, function

```csharp
exec function TSHM(int nHeadMeshID)
```

### AllowMount

**Parameters:**

- `bEnabled`: optional bool
  - default: true

**Modifiers:** exec, function

```csharp
exec function AllowMount(optional bool bEnabled = true)
```

### PlayPotG

**Modifiers:** exec, function

```csharp
exec function PlayPotG()
```

### PlayPotGForAll

**Modifiers:** exec, function

```csharp
exec function PlayPotGForAll()
```

### ResetPotG

**Modifiers:** exec, function

```csharp
exec function ResetPotG()
```

### LockPotG

**Parameters:**

- `bLocked`: bool

**Modifiers:** exec, function

```csharp
exec function LockPotG(bool bLocked)
```

### EnableAI

**Parameters:**

- `bEnabled`: bool

**Modifiers:** exec, function

```csharp
exec function EnableAI(bool bEnabled)
```

### KillProjectiles

**Modifiers:** exec, function

```csharp
exec function KillProjectiles()
```

### ToggleAIDifficultyAdjust

**Modifiers:** exec, function

```csharp
exec function ToggleAIDifficultyAdjust()
```

### EnableGhostMounting

**Parameters:**

- `bEnabled`: bool

**Modifiers:** exec, function

```csharp
exec function EnableGhostMounting(bool bEnabled)
```

### StopFog

**Modifiers:** exec, function

```csharp
exec function StopFog()
```

### ResumeFog

**Modifiers:** exec, function

```csharp
exec function ResumeFog()
```

### SetFogDistance

**Parameters:**

- `Distance`: int

**Modifiers:** exec, function

```csharp
exec function SetFogDistance(int Distance)
```

### PlayIntroAnim

**Modifiers:** exec, function

```csharp
exec function PlayIntroAnim()
```

### SetMountSkin

**Parameters:**

- `nSkinId`: int

**Modifiers:** exec, function

```csharp
exec function SetMountSkin(int nSkinId)
```

### toggleDiminishingReturns

**Modifiers:** exec, function

```csharp
exec function toggleDiminishingReturns()
```
