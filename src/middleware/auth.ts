// middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";

// Extend Request interface to include auth
declare global {
	namespace Express {
		interface Request {
			auth?: {
				userId: string;
				sessionId: string;
				orgId?: string;
				orgRole?: string;
				orgSlug?: string;
			};
			user?: {
				id: string;
				emailAddress: string;
				firstName: string;
				lastName: string;
				role: string;
				publicMetadata: any;
				privateMetadata: any;
			};
		}
	}
}

/**
 * Middleware to require authentication
 * Validates JWT token and attaches user info to request
 */
export const requireAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const auth = getAuth(req);

		if (!auth?.userId) {
			res.status(401).json({
				error: "Unauthorized",
				message: "Valid authentication token required",
			});
            return;
		}

		// Get user details from Clerk
		const user = await clerkClient.users.getUser(auth.userId);

		if (!user) {
			res.status(401).json({
				error: "Unauthorized",
				message: "User not found",
			});
            return;
		}

		// Attach auth and user info to request
		req.auth = auth;
		req.user = {
			id: user.id,
			emailAddress: user.emailAddresses[0]?.emailAddress || "",
			firstName: user.firstName || "",
			lastName: user.lastName || "",
			role: (user.publicMetadata as any)?.role || "user",
			publicMetadata: user.publicMetadata,
			privateMetadata: user.privateMetadata,
		};

		next();
	} catch (error) {
		console.error("Auth middleware error:", error);
		res.status(401).json({
			error: "Unauthorized",
			message: "Invalid or expired token",
		});
        return;
	}
};

/**
 * Middleware to require admin role
 * Must be used after requireAuth
 */
export const requireAdmin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.user) {
		res.status(401).json({
			error: "Unauthorized",
			message: "Authentication required",
		});
        return;
	}

	if (req.user.role !== "admin") {
		res.status(403).json({
			error: "Forbidden",
			message: "Admin access required",
		});
        return;
	}

	next();
};

/**
 * Middleware to require specific roles
 * Usage: requireRoles(['admin', 'moderator'])
 */
export const requireRoles = (allowedRoles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			res.status(401).json({
				error: "Unauthorized",
				message: "Authentication required",
			});
            return;
		}

		if (!allowedRoles.includes(req.user.role)) {
			res.status(403).json({
				error: "Forbidden",
				message: `Required roles: ${allowedRoles.join(", ")}`,
			});
            return;
		}

		next();
	};
};

/**
 * Middleware for optional authentication
 * Doesn't fail if no token, but populates user if valid token exists
 */
export const optionalAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const auth = getAuth(req);

		if (auth?.userId) {
			const user = await clerkClient.users.getUser(auth.userId);

			if (user) {
				req.auth = auth;
				req.user = {
					id: user.id,
					emailAddress: user.emailAddresses[0]?.emailAddress || "",
					firstName: user.firstName || "",
					lastName: user.lastName || "",
					role: (user.publicMetadata as any)?.role || "user",
					publicMetadata: user.publicMetadata,
					privateMetadata: user.privateMetadata,
				};
			}
		}

		next();
	} catch (error) {
		// Continue without auth if token is invalid
		next();
	}
};

/**
 * Middleware to check if user owns resource or is admin
 * Usage: requireOwnershipOrAdmin('userId') - checks if req.params.userId matches authenticated user
 */
export const requireOwnershipOrAdmin = (ownerIdParam: string = "userId") => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			res.status(401).json({
				error: "Unauthorized",
				message: "Authentication required",
			});
            return;
		}

		const resourceOwnerId =
			req.params[ownerIdParam] || req.body[ownerIdParam];
		const isOwner = req.user.id === resourceOwnerId;
		const isAdmin = req.user.role === "admin";

		if (!isOwner && !isAdmin) {
			res.status(403).json({
				error: "Forbidden",
				message:
					"You can only access your own resources unless you are an admin"
			});
            return;
		}

		next();
	};
};

/**
 * Utility function to set user role in Clerk
 * Call this when you want to promote a user to admin
 */
export const setUserRole = async (userId: string, role: string) => {
	try {
		await clerkClient.users.updateUserMetadata(userId, {
			publicMetadata: {
				role: role,
			},
		});
		return true;
	} catch (error) {
		console.error("Error setting user role:", error);
		return false;
	}
};