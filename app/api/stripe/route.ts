import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import {stripe} from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';

const settingsUrl = absoluteUrl('/settings');