import { Router, Request, Response } from 'express';
import { UserRepository } from './repositories/UserRepository';
import { UserService } from './services/UserService';
import { UserAccount } from './models/UserAccount';
import { UserProfile } from './models/UserProfile';
import { NewUserProfile } from './models/NewUserProfile';

const userRouter: Router = Router();
const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService();

userRouter.get('/users', async (req: Request, res: Response) => {
    try {
        const userAccounts: UserAccount[] = await userRepository.findAllUserAccounts();
        const userProfiles: UserProfile[] = await userService.getUserProfiles(userAccounts);
        res.json(userProfiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user profiles' });
    }
});

userRouter.post('/users', async (req: Request, res: Response) => {
    try {
        const newUserProfile: NewUserProfile = req.body;
        if (!newUserProfile) {
            res.status(400).json({ error: 'Invalid new user profile' });
            return;
        }
        const createdUserProfile: UserProfile = await userService.createUserProfile(newUserProfile);
        res.json(createdUserProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user profile' });
    }
});

userRouter.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const userId: string = req.params.id;
        if (!userId || isNaN(parseInt(userId, 10))) {
            res.status(400).json({ error: 'Invalid user ID' });
            return;
        }
        const userAccount: UserAccount = await userRepository.findUserAccountById(parseInt(userId, 10));
        if (!userAccount) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        const userProfile: UserProfile = await userService.getUserProfile(userAccount);
        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user profile' });
    }
});