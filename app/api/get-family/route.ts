import { NextRequest, NextResponse } from 'next/server';
import guestsData from '@/guests.json';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const familyId = searchParams.get('familyId');

        if (!familyId) {
            return NextResponse.json(
                { error: 'familyId is required' },
                { status: 400 }
            );
        }

        const family = guestsData.families.find(
            (f) => f.id === parseInt(familyId)
        );

        if (!family) {
            return NextResponse.json(
                { error: 'Family not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(family);
    } catch (error) {
        console.error('Error getting family:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
