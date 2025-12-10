import { Controller, Get } from "@nestjs/common";
import * as fs from "node:fs";
import * as path from "node:path";

@Controller('day3')
export class Day3Controller {
    @Get()
    async findMaximumVoltage(): Promise<number> {
        let maxVoltageOutput = 0;
        const filePath = path.join(process.cwd(), 'dist', 'assets', 'day3_input.txt');
        const data = await fs.promises.readFile(filePath, 'utf8');
        const banks: string[] = data.split(/\r?\n/)
            .filter(line => line.length > 0);
        for (let bank of banks) {
            let batteries = Int16Array.from(bank);
            let maxVoltageBank = batteries.subarray(0, batteries.length - 1).reduce((max, current) => Math.max(max, current), 0);
            let indexOfMaxVoltage = batteries.indexOf(maxVoltageBank);
            let secondMaxVoltageBank = batteries.subarray(indexOfMaxVoltage + 1, batteries.length).reduce((max, current) => Math.max(max, current), 0);
            let totalVoltageBank: number = Number.parseInt(maxVoltageBank.toString() + secondMaxVoltageBank.toString());
            // console.log(`${bank};A:${maxVoltageBank};B:${secondMaxVoltageBank};total=${totalVoltageBank}`);
            maxVoltageOutput += totalVoltageBank;
        }
        return maxVoltageOutput;
    }
}