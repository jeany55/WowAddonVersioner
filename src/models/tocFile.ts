import path from 'path'
import { GameType } from '.'
import fs from 'fs'
import { GameTypePrefixesMap } from '../constants'

/**
 * Represents a World of Warcraft addon TOC file.
 * @class
 * @param {string} fileName The name of the TOC file.
 * @param {string} location The file path of the TOC file (not including the file name).
 */
export class TocFile {
  fileName: string
  filePath: string
  gameType?: GameType
  interfaceNumber: string
  fileContents: string
  newInterfaceNumber?: string
  noKnownInterface: boolean = false

  constructor(fileName: string, location: string) {
    this.fileName = fileName
    this.filePath = path.join(location, fileName)
    this.fileContents = fs.readFileSync(this.filePath, 'utf-8')

    const interfaceNumberMatch = this.fileContents.match(/## Interface: (\d+)/)
    this.interfaceNumber = interfaceNumberMatch ? interfaceNumberMatch[1] : ''

    if (this.interfaceNumber) {
      // Remove last 4 digits to get the prefix
      const prefixCheck = this.interfaceNumber.slice(0, -4)

      this.gameType = GameTypePrefixesMap[prefixCheck]
    }
  }

  checkAndUpdateInterfaceVersion(newInterface: string) {
    if (newInterface > this.interfaceNumber) {
      this.newInterfaceNumber = newInterface
    }
  }

  saveUpdatedInterfaceNumber() {
    if (this.newInterfaceNumber) {
      this.fileContents = this.fileContents.replace(/## Interface: \d+/, `## Interface: ${this.newInterfaceNumber}`)
      fs.writeFileSync(this.filePath, this.fileContents, 'utf-8')
    }
  }
}
