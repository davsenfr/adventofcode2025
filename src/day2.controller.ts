import { Controller, Get } from "@nestjs/common";
import * as fs from "node:fs";
import * as path from "node:path";

@Controller('day2')
export class Day2Controller {
    @Get('invalid-ids')
    async sumInvalidIds(): Promise<number> {
        const filePath = path.join(process.cwd(), 'dist', 'assets', 'day2_input.txt');
        const rangeIdsString = await fs.promises.readFile(filePath, 'utf8');
        let sumInvalidIds: number = 0;
        const rangeIds: string[] = rangeIdsString.split(',');
        for(let range of rangeIds) {
            const [minRange, maxRange] = range.split('-').map(Number);
            const invalidInRange = this.listInvalidIdsBetween(minRange, maxRange);
            sumInvalidIds = invalidInRange.filter(item => item !== null).reduce((sumInvalidIds, currentValue) => sumInvalidIds + currentValue, sumInvalidIds);
        }
        return sumInvalidIds;
    }

    listInvalidIdsBetween(minRange: number, maxRange: number): (number|null)[] {
        let list: number[] = [];
        if(
            minRange.toString().length % 2 !== 0
            && maxRange.toString().length % 2 !== 0
            && minRange.toString().length === maxRange.toString().length
        ) {
            return list;
        }
        else {
            for (let i = minRange; i <= maxRange; i++) {
                const regex = /^(\d+)(?:\1)$/;
                const match = i.toString().match(regex);
                if((match) && match[0]) {
                    list.push(Number.parseInt(match[0]));
                }
            }
        }
        return list;
    }

    @Get('invalid-ids-part2')
    async sumInvalidIdsPart2(): Promise<number> {
        const filePath = path.join(process.cwd(), 'dist', 'assets', 'day2_input.txt');
        const rangeIdsString = await fs.promises.readFile(filePath, 'utf8');
        let sumInvalidIds: number = 0;
        const rangeIds: string[] = rangeIdsString.split(',');
        for(let range of rangeIds) {
            const [minRange, maxRange] = range.split('-').map(Number);
            const invalidInRange = this.listInvalidIdsBetweenPartTwo(minRange, maxRange);
            sumInvalidIds = invalidInRange.filter(item => item !== null).reduce((sumInvalidIds, currentValue) => sumInvalidIds + currentValue, sumInvalidIds);
            console.log(`Range ${minRange}-${maxRange}; Invalid IDs are:${invalidInRange.join(',')}; sum is:${sumInvalidIds}`)
        }
        return sumInvalidIds;
    }

    listInvalidIdsBetweenPartTwo(minRange: number, maxRange: number): (number|null)[] {
        let list: number[] = [];
        for (let i = minRange; i <= maxRange; i++) {
            console.log(i);
            const regex = /^(\d+)(?:\1)+$/;
            const match = i.toString().match(regex);
            if((match) && match[0]) {
                list.push(Number.parseInt(match[0]));
            }
        }
        return list;
    }
}