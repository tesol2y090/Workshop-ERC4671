import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction, DeployResult } from "hardhat-deploy/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre
  const { deployer } = await getNamedAccounts()

  const { deploy } = deployments

  const NAME = "Name"
  const SYMBOL = "Symbol"
  const BADGE_NAME = "Chainlink workshop #1"
  const BADGE_DESCRIPTION = "First workshop event from chainlink"

  const result: DeployResult = await deploy("Badge", {
    contract: "Badge",
    from: deployer,
    args: [NAME, SYMBOL, BADGE_NAME, BADGE_DESCRIPTION],
    log: true,
    waitConfirmations: 6,
  })

  console.log("Result = ", result.address)

  try {
    await hre.run("verify:verify", {
      address: result.address,
      constructorArguments: [NAME, SYMBOL, BADGE_NAME, BADGE_DESCRIPTION],
    })
  } catch (err) {
    console.log("Error: ", err)
  }
}

export default func
func.tags = ["Badge"]
