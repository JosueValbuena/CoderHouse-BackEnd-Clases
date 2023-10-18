import passport from 'passport';
import local from 'passport-local';
import userModel from '../models/user.models.js'
import { createHash, isValidPassword } from '../utils/utils.js';

//estrategia 1

const localStrategy = local.Strategy;

const initializePassport = () => {
    
}