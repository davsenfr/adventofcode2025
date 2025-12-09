import { Controller, Get } from '@nestjs/common';
import * as fs from "node:fs";
import * as path from "node:path";

/**
 * Day 1 part I and II
 */
@Controller()
export class DoorController {
    constructor() {}

    @Get('door/1')
    async listMovesEqualToZero(): Promise<number> {
        const filePath = path.join(process.cwd(), 'dist', 'assets', 'input.txt');
        const data = await fs.promises.readFile(filePath, 'utf8');
        let arrowPosition = 50;
        let countZeroPosition = 0;

        const result = data.split(/\r?\n/)
            .filter(line => line.length > 0);

        for (let instruction of result) {
            if( this.getDirection(instruction) === 'L') {
                let value = (arrowPosition - Number.parseInt(instruction.substring(1)) + 100) % 100;
                arrowPosition = value;
                if(value === 0) countZeroPosition++;
            }
            if( this.getDirection(instruction) === 'R') {
                let value = (arrowPosition + Number.parseInt(instruction.substring(1))) % 100;
                arrowPosition = value;
                if(value === 0) countZeroPosition++;
            }


        }

        return countZeroPosition;
    }

    @Get('door/2')
    async listMovesPassingByZero(): Promise<number> {
        const filePath = path.join(process.cwd(), 'dist', 'assets', 'input.txt');
        const data = await fs.promises.readFile(filePath, 'utf8');
        let arrowPosition = 50;
        let countPassingByZeroPosition = 0;

        const result = data.split(/\r?\n/)
            .filter(line => line.length > 0);

        for (let instruction of result) {
            let instructionValue = Number.parseInt(instruction.substring(1));
            let numCompleteRotation = Math.floor(instructionValue / 100);
            console.log(`[${instruction}]`);
            console.log(`Arrow clock has done ${numCompleteRotation} complete rotation(s). So it passed ${numCompleteRotation} by value 0.`);
            let numRemainsClicks =  instructionValue % 100;
            console.log(`It remains ${numRemainsClicks} tick(s)`);
            let countRemainClickPassedZero = 0;
            if( this.getDirection(instruction) === 'L' ) {
                if(arrowPosition !== 0) { // When we start from 0 we don't want to count another time the position 0
                    countRemainClickPassedZero = (arrowPosition - numRemainsClicks) < 1 ? 1 : 0;
                }
                arrowPosition = ((arrowPosition - numRemainsClicks) + 100) % 100;
            }
            else {
                if(arrowPosition !== 0) {
                    countRemainClickPassedZero = (arrowPosition + numRemainsClicks) > 99 ? 1 : 0;
                }
                arrowPosition = (arrowPosition + numRemainsClicks) % 100;
            }
            console.log(`Arrow clock is now at position: ${arrowPosition}. It has passed ${countRemainClickPassedZero} time the value 0.`);
            countPassingByZeroPosition = countPassingByZeroPosition + numCompleteRotation + countRemainClickPassedZero;
        }
        return countPassingByZeroPosition;
    }

    getDirection(instruction: string): string {
        return instruction.charAt(0);
    }
}
