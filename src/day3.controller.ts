import { Controller, Get } from "@nestjs/common";
import * as fs from "node:fs";
import * as path from "node:path";

@Controller('day3')
export class Day3Controller {
    readonly numSeriesBattery = 12;
    @Get()
    async findMaximumVoltage(): Promise<number> {
        let maxVoltageOutput = 0;
        const filePath = path.join(process.cwd(), 'dist', 'assets', 'day3_input.txt');
        const data = await fs.promises.readFile(filePath, 'utf8');
        const banks: string[] = data.split(/\r?\n/)
            .filter(line => line.length > 0);
        for (let bank of banks) {
            let batteries = Int16Array.from(bank);
            let nextBankLimitStart = 0;
            let bankMaxVoltagePack: string = '';
            for (let limit=1; limit<=this.numSeriesBattery; limit++) {
                let bankLimitEnd: number = batteries.length - (this.numSeriesBattery - limit);
                let maxVoltageBank = batteries.subarray(nextBankLimitStart, bankLimitEnd).reduce((max, current) => Math.max(max, current), 0);
                // Get the index where we found max value for future search
                nextBankLimitStart = batteries.indexOf(maxVoltageBank, nextBankLimitStart) + 1;
                bankMaxVoltagePack += maxVoltageBank.toString();
            }
            maxVoltageOutput += Number.parseInt(bankMaxVoltagePack);
        }
        return maxVoltageOutput;
    }
}