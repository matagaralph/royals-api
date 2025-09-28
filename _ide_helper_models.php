<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property string $id
 * @property string $company_id
 * @property string $name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon $start_date
 * @property \Illuminate\Support\Carbon $end_date
 * @property int $min_points_per_voucher
 * @property string $min_spend_for_point
 * @property \App\Enums\CampaignStatus $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Company $company
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Reward> $rewards
 * @property-read int|null $rewards_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ShopperPoint> $shopperPoints
 * @property-read int|null $shopper_points_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Voucher> $vouchers
 * @property-read int|null $vouchers_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereMinPointsPerVoucher($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereMinSpendForPoint($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Campaign whereUpdatedAt($value)
 */
	class Campaign extends \Eloquent {}
}

namespace App\Models{
/**
 * @property string $id
 * @property string $user_id
 * @property string $reward_id
 * @property string $code
 * @property \App\Enums\ClaimVoucherStatus $status
 * @property bool $is_used
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Reward $reward
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ClaimVoucher newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ClaimVoucher newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ClaimVoucher query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ClaimVoucher whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ClaimVoucher whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ClaimVoucher whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ClaimVoucher whereIsUsed($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ClaimVoucher whereRewardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ClaimVoucher whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ClaimVoucher whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ClaimVoucher whereUserId($value)
 */
	class ClaimVoucher extends \Eloquent {}
}

namespace App\Models{
/**
 * @property string $id
 * @property string $company_id
 * @property string $email
 * @property string $token
 * @property \Illuminate\Support\Carbon|null $accepted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Company $company
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CollaboratorInvitation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CollaboratorInvitation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CollaboratorInvitation query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CollaboratorInvitation whereAcceptedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CollaboratorInvitation whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CollaboratorInvitation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CollaboratorInvitation whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CollaboratorInvitation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CollaboratorInvitation whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CollaboratorInvitation whereUpdatedAt($value)
 */
	class CollaboratorInvitation extends \Eloquent {}
}

namespace App\Models{
/**
 * @property string $id
 * @property string $name
 * @property string|null $logo
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $owner_id
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Campaign> $campaigns
 * @property-read int|null $campaigns_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CollaboratorInvitation> $invitations
 * @property-read int|null $invitations_count
 * @property-read \App\Models\User $owner
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Company newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Company newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Company query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Company whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Company whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Company whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Company whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Company whereOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Company whereUpdatedAt($value)
 */
	class Company extends \Eloquent {}
}

namespace App\Models{
/**
 * @property string $id
 * @property string $name
 * @property string $guard_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission role($roles, $guard = null, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission whereGuardName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission withoutPermission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Permission withoutRole($roles, $guard = null)
 */
	class Permission extends \Eloquent {}
}

namespace App\Models{
/**
 * @property string $id
 * @property string $campaign_id
 * @property string $title
 * @property string|null $description
 * @property int $points_required
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Campaign $campaign
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ClaimVoucher> $claimVouchers
 * @property-read int|null $claim_vouchers_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward wherePointsRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Reward whereUpdatedAt($value)
 */
	class Reward extends \Eloquent {}
}

namespace App\Models{
/**
 * @property string $id
 * @property string $name
 * @property string $guard_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereGuardName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Role withoutPermission($permissions)
 */
	class Role extends \Eloquent {}
}

namespace App\Models{
/**
 * @property string $id
 * @property string $user_id
 * @property string $campaign_id
 * @property int $points
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Campaign $campaign
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShopperPoint newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShopperPoint newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShopperPoint query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShopperPoint whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShopperPoint whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShopperPoint whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShopperPoint wherePoints($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShopperPoint whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShopperPoint whereUserId($value)
 */
	class ShopperPoint extends \Eloquent {}
}

namespace App\Models{
/**
 * @property string $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $company_id
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Company|null $company
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User permission($permissions, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User role($roles, $guard = null, $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutPermission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutRole($roles, $guard = null)
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * @property string $id
 * @property string $campaign_id
 * @property int $points_value
 * @property string $code
 * @property string|null $reference
 * @property \Illuminate\Support\Carbon|null $scanned_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Campaign $campaign
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Voucher newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Voucher newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Voucher query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Voucher whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Voucher whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Voucher whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Voucher whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Voucher wherePointsValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Voucher whereReference($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Voucher whereScannedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Voucher whereUpdatedAt($value)
 */
	class Voucher extends \Eloquent {}
}

