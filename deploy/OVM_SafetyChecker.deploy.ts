/* Imports: External */
import { DeployFunction } from 'hardhat-deploy/dist/types'

/* Imports: Internal */
import { getDeployedContract } from '../src/hardhat-deploy-ethers'

const deployFn: DeployFunction = async (hre) => {
  const { deploy } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()

  const Lib_AddressManager = await getDeployedContract(
    hre,
    'Lib_AddressManager',
    {
      signerOrProvider: deployer,
    }
  )

  const result = await deploy('OVM_SafetyChecker', {
    from: deployer,
    args: [],
    log: true,
  })

  if (!result.newlyDeployed) {
    return
  }

  await Lib_AddressManager.setAddress('OVM_SafetyChecker', result.address)
}

deployFn.tags = ['OVM_SafetyChecker']

export default deployFn
